import {ExecutorOptionType} from '@layerzerolabs/lz-v2-utilities';
import {OAppEnforcedOption, OmniPointHardhat} from '@layerzerolabs/toolbox-hardhat';
import {EndpointId} from '@layerzerolabs/lz-definitions';
import {generateConnectionsConfig} from '@layerzerolabs/metadata-tools';

export const baseContract: OmniPointHardhat = {
  eid: EndpointId.BASE_V2_MAINNET,
  contractName: 'OptimismMintableERC20',
};

export const solanaContract: OmniPointHardhat = {
  eid: EndpointId.SOLANA_V2_MAINNET,
  address: '7A43abkvMkCox25Xhoas36rHJBWNEYfMfZhttF6FpTYi', // your OFT Store address
};

const EVM_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
  {
    msgType: 1,
    optionType: ExecutorOptionType.LZ_RECEIVE,
    gas: 80000,
    value: 0,
  },
  {
    msgType: 2,
    optionType: ExecutorOptionType.LZ_RECEIVE,
    gas: 80000,
    value: 0,
  },
  {
    msgType: 2,
    optionType: ExecutorOptionType.COMPOSE,
    index: 0,
    gas: 80000,
    value: 0,
  },
];

const SOLANA_ENFORCED_OPTIONS: OAppEnforcedOption[] = [
  {
    msgType: 1,
    optionType: ExecutorOptionType.LZ_RECEIVE,
    gas: 200000,
    value: 2500000,
  },
  {
    msgType: 2,
    optionType: ExecutorOptionType.LZ_RECEIVE,
    gas: 200000,
    value: 2500000,
  },
  {
    // Solana options use (gas == compute units, value == lamports)
    msgType: 2,
    optionType: ExecutorOptionType.COMPOSE,
    index: 0,
    gas: 0,
    value: 0,
  },
];

export default async function () {
  const connections = await generateConnectionsConfig([
    [baseContract, solanaContract, [['LayerZero Labs', 'Google'], []], [10, 32], [SOLANA_ENFORCED_OPTIONS, EVM_ENFORCED_OPTIONS]],
  ]);

  return {
    contracts: [
        {
          contract: baseContract,
          config: {
            delegate: '0x97cF38bB06Da57b6418083998b09976eC40A90a3',
            owner: '0x97cF38bB06Da57b6418083998b09976eC40A90a3'
          }
        },
        {
          contract: solanaContract,
          config: {
            delegate: 'c4xoPCx8Qfs4w66Yr7oALToCBBMicQpvZWwtaGoJ4EB',
            owner: 'c4xoPCx8Qfs4w66Yr7oALToCBBMicQpvZWwtaGoJ4EB'
          }
        }
    ],
    connections,
  };
}