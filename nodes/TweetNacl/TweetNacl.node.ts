import { IExecuteFunctions } from "n8n-core";
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from "n8n-workflow";
import { signOperations, signFields } from "./SignDescription";
import * as nacl from "tweetnacl";

export class TweetNacl implements INodeType {
	description: INodeTypeDescription = {
		displayName: "TweetNaCl",
		name: "tweetNaCl",
		group: ["transform"],
		version: 1,
		description: "Use TweetNaCl to encrypt or decrypt data.",
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		defaults: {
			name: "TweetNaCl",
			color: "#772244",
			description: "Use TweetNaCl to encrypt or decrypt data.",
		},
		inputs: ["main"],
		outputs: ["main"],
		properties: [
			{
				displayName: "Resource",
				name: "resource",
				type: "options",
				default: "sign",
				description: "The resource to perform",
				options: [
					{
						name: "Sign",
						value: "sign",
						description: "Sign a message",
					},
					// {
					// 	name: "Verify",
					// 	value: "verify",
					// 	description: "Verify a message",
					// },
				],
			},
			...signOperations,
			...signFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		let responseData;
		const resource = this.getNodeParameter("resource", 0) as string;
		const operation = this.getNodeParameter("operation", 0) as string;
		for (let i = 0; i < items.length; i++) {
			if (resource === "sign") {
				if (operation === "detachedVerify") {
					const message = this.getNodeParameter("message", i) as string;
					const signature = this.getNodeParameter("signature", i) as string;
					const publicKey = this.getNodeParameter("publicKey", i) as string;
					try {
						responseData = nacl.sign.detached.verify(
							Buffer.from(message),
							Buffer.from(signature, "hex"),
							Buffer.from(publicKey, "hex")
						);
						returnData.push({ isVerified: responseData });
					} catch (error) {
						if (this.continueOnFail()) {
							returnData.push({ error: "Failed to execute TweetNaCl. " });
							continue;
						}
						throw error;
					}
				}
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
