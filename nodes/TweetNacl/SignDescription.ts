import { INodeProperties } from "n8n-workflow";

export const signOperations: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		description: "Choose an operation",
		required: true,
		displayOptions: {
			show: {
				resource: ["sign"],
			},
		},
		options: [
			// {
			// 	name: "Key Pair",
			// 	value: "keyPair",
			// 	description: "Generate new random key pair for signing",
			// },
			// {
			// 	name: "Key Pair from Secret Key",
			// 	value: "keyPairFromSecretKey",
			// 	description:
			// 		"Generate a signing key pair with public key corresponding to the given 64-byte secret key",
			// },
			{
				name: "Detached Verify",
				value: "detachedVerify",
				description: "Verify the signature for the message and return boolean",
			},
		],
		default: "detachedVerify",
	},
];

export const signFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                sign: detached verify                       */
	/* -------------------------------------------------------------------------- */
	{
		displayName: "Message",
		name: "message",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["sign"],
				operation: ["detachedVerify"],
			},
		},
		default: "",
		description: "Message to verify",
	},
	{
		displayName: "Signature",
		name: "signature",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["sign"],
				operation: ["detachedVerify"],
			},
		},
		default: "",
		description: "Signature to use for verification",
	},
	{
		displayName: "Public Key",
		name: "publicKey",
		type: "string",
		required: true,
		displayOptions: {
			show: {
				resource: ["sign"],
				operation: ["detachedVerify"],
			},
		},
		default: "",
		description: "Public to use for verification",
	},
];
