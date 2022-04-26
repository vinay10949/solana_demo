import { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { Buffer } from 'buffer'
import * as web3 from '@solana/web3.js'
import * as borsh from 'borsh';

// Import CSS
import './App.css'

// Import Components
import Navbar from './Navbar';

function App() {
	const [programId, setProgramId] = useState('BM878Lo35K28GT9cYXB48HcqNm6Ceo1igJeFRv4zGR7V')
	const [connection, setConnection] = useState(null) // Connection to Solana's Network
	const [keypair, setKeypair] = useState(null)
	const [greetedKey, setGreetedKey] = useState(null)
	const [transactionHash, setTransactionHash] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState('')

	useEffect(() => {
		const _connection = new web3.Connection(web3.clusterApiUrl('devnet'))
		_connection ? setConnection(_connection) : setConnection(null)
	}, [])

	const keyPairHandler = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setMessage('Generating and Funding new keypair...')

		// Generate new keypair
		const _keypair = web3.Keypair.generate();
		setKeypair(_keypair)

		// Fund with SOL
		const airdropSignature = await connection.requestAirdrop(
			_keypair.publicKey,
			web3.LAMPORTS_PER_SOL,
		)

		await connection.confirmTransaction(airdropSignature)

		setMessage('')
		setIsLoading(false)
	}

	const transactionHandler = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		setMessage('Setting up a greeted key...')

		class GreetingAccount {
			counter = 0;
			constructor(fields) {
				if (fields) {
					this.counter = fields.counter;
				}
			}
		}

		const GreetingSchema = new Map([
			[GreetingAccount, { kind: 'struct', fields: [['counter', 'u32']] }],
		]);

		const GREETING_SIZE = borsh.serialize(
			GreetingSchema,
			new GreetingAccount(),
		).length

		const GREETING_SEED = 'hello';
		const programPublicKey = new web3.PublicKey(programId)

		// Create another public key based off of the key we generated, and the deployed program's key.
		// This will be the key the program will own to store/modify data
		const greetedPubkey = await web3.PublicKey.createWithSeed(
			keypair.publicKey,
			GREETING_SEED,
			programPublicKey,
		)

		setGreetedKey(greetedPubkey)

		const greetedAccount = await connection.getAccountInfo(greetedPubkey)

		// Checking to see if account has already been greeted, if not, allow program to own and reference the greetedPubkey
		if (greetedAccount === null) {
			const lamports = await connection.getMinimumBalanceForRentExemption(
				GREETING_SIZE,
			)

			const transaction = new web3.Transaction().add(
				web3.SystemProgram.createAccountWithSeed({
					fromPubkey: keypair.publicKey,
					basePubkey: keypair.publicKey,
					seed: GREETING_SEED,
					newAccountPubkey: greetedPubkey,
					lamports,
					space: GREETING_SIZE,
					programId: programPublicKey,
				}),
			)

			await web3.sendAndConfirmTransaction(connection, transaction, [keypair]);
		}

		// Now that we have set up our greetedPubkey, lets say hello...
		setMessage('Attempting to say hello...')

		const instruction = new web3.TransactionInstruction({
			programId: programPublicKey,
			keys: [{ pubkey: greetedPubkey, isSigner: false, isWritable: true }],
			data: Buffer.alloc(0),
		})

		const transactionHash = await web3.sendAndConfirmTransaction(connection, new web3.Transaction().add(instruction), [keypair])
		setTransactionHash(transactionHash)

		setIsLoading(false)
	}

	return (
		<div>

			<Navbar account={keypair} />

			<main role="main" className="container-fluid text-center">
				<div className="col-lg-12">

					<div className="row">
						<div className="col my-5">
							<h1>Solana Introduction</h1>
							<h2>Hello World</h2>
						</div>
					</div>

					<div className="row content">
						<div className="col user-controls">
							{isLoading ? (
								<div>
									<Spinner animation="border" style={{ margin: '0 auto' }} />
									<p>{message}</p>
								</div>
							) : (
								<div>
									{keypair ? (
										<div>
											<p>{keypair.publicKey.toString()}</p>
											<button onClick={transactionHandler} disabled={isLoading}>Say Hello</button>
										</div>
									) : (
										<button onClick={keyPairHandler} disabled={keypair}>Generate New Keypair</button>
									)}
								</div>
							)}

							{greetedKey &&
								<p className='my-4'>
									Created <a href={`https://explorer.solana.com/address/${greetedKey.toString()}?cluster=devnet`} target='_blank'>
										{greetedKey.toString()}
									</a> based off the key you generated.
								</p>}

							{transactionHash &&
								<p>
									Successfully Greeted {greetedKey.toString()}! <br />View transaction at<br />
									<a href={`https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`} target='_blank'>Solana Explorer</a>
								</p>
							}
						</div>
					</div>
				</div>
			</main >
		</div >
	);
}

export default App