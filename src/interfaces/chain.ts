import { ChainError } from '../errors'
import { Transaction } from './transaction'
import { CreateAccount } from './createAccount'
import { Account } from './account'
import {
  ChainAsset,
  ChainDate,
  ChainEntityName,
  ChainInfo,
  ChainType,
  PublicKey,
  PrivateKey,
  Signature,
  EncryptedDataString,
  TransactionOptions,
} from '../models'

/** The Chain interface declares the operations that all concrete chains must implement */
export interface Chain {
  /** Return unique chain ID string */
  chainId: string
  /** Retrieve lastest chain info including head block number and time */
  chainInfo: ChainInfo
  /** Returns last datetime chain info was retrieved */
  isConnected: boolean
  /** Returns chain type enum - resolves to chain family as a string e.g. 'eos' */
  chainType: ChainType
  /** Returns chain plug-in name */
  description: string
  /** Connect to chain endpoint to verify that it is operational and to get latest block info */
  connect(): Promise<void>
  /** Compose an object for a chain contract action */
  composeAction(chainActionType: any, args: any): any
  /** Fetch data from an on-chain contract table */
  fetchContractData(
    contract: string,
    table: string,
    owner: string,
    indexNumber?: number,
    lowerRow?: number,
    upperRow?: number,
    limit?: number,
    reverseOrder?: boolean,
    showPayer?: boolean,
    keyType?: string,
  ): Promise<any>
  /** Returns a new instance of an object */
  new: {
    /** Returns a new chain Account object
     * If an account name is provided, it will be fetched from the chain and loaded into the returned account object
     * Note: Does NOT create a new account - to create an account, use new.CreateAccount */
    Account(accountName?: string): Promise<Account>
    /** Return a new CreateAccount object used to help with creating a new chain account */
    CreateAccount(options?: any): CreateAccount
    /** Return a chain Transaction object used to compose and send transactions */
    Transaction(options?: TransactionOptions): Transaction
  }

  // Chain Crypto functions

  /** Decrypts the encrypted value using a password, and salt using AES algorithm and SHA256 hash function
   * Expects the encrypted value to be a stringified JSON object */
  decrypt(encrypted: EncryptedDataString, password: string, salt: string): string
  /** Encrypts a string using a password and salt using AES algorithm and SHA256 hash function
   * The returned, encrypted value is a stringified JSON object */
  encrypt(unencrypted: string, password: string, salt: string): EncryptedDataString
  /** Returns a public key given a signature and the original data was signed */
  getPublicKeyFromSignature(signature: any, data: string | Buffer, encoding: string): PublicKey
  /** Verifies that the value is a valid, stringified JSON ciphertext */
  isValidEncryptedData(value: string): boolean
  /** Generate a signature given some data and a private key */
  isValidPrivateKey(value: string | Buffer): boolean
  /** Verifies that the value is a valid public key for the chain */
  isValidPublicKey(value: string | Buffer): boolean
  /** Generate a signature given some data and a private key */
  sign(data: string | Buffer, privateKey: string, encoding: string): any
  /** Verify that the signed data was signed using the given key (signed with the private key for the provided public key) */
  verifySignedWithPublicKey(publicKey: string | Buffer, data: string | Buffer, encoding: string): boolean

  // Chain Helper functions

  /** Verifies that the value is a valid chain entity name (e.g. an account name) */
  isValidEntityName(value: string): boolean
  /** Verifies that the value is a valid chain asset string */
  isValidAsset(value: any): boolean
  /** Verifies that the value is a valid chain date */
  isValidDate(value: string): boolean
  /** Ensures that the value comforms to a well-formed chain asset string */
  toAsset(amount: number, symbol: string): ChainAsset
  /** Ensures that the value comforms to a well-formed chain entity name (e.g. an account name) */
  toEntityName(value: string): ChainEntityName
  /** Ensures that the value comforms to a well-formed chain date string */
  toDate(value: string | Date): ChainDate
  /** Ensures that the value comforms to a well-formed public Key */
  toPublicKey(value: string): PublicKey
  /** Ensures that the value comforms to a well-formed private Key */
  toPrivateKey(value: string): PrivateKey
  /** Ensures that the value comforms to a well-formed encrypted stringified JSON object */
  toEncryptedDataString(value: any): EncryptedDataString
  /** Ensures that the value comforms to a well-formed signature */
  toSignature(value: string): Signature

  /** Transforms a chain-specfic error type (e.g. RpcError on EOS) to a 'standard' error type (ChainError) that includes additional chain insights */
  mapChainError(error: Error): ChainError
}
