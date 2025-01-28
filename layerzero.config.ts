import {ExecutorOptionType} from '@layerzerolabs/lz-v2-utilities';
import {OAppEnforcedOption, OmniPointHardhat} from '@layerzerolabs/toolbox-hardhat';
import {EndpointId} from '@layerzerolabs/lz-definitions';
import {generateConnectionsConfig} from '@layerzerolabs/metadata-tools';

export const baseContract: OmniPointHardhat = {
  eid: EndpointId.BASE_V2_MAINNET,
  contractName: 'VirtualOFTAdapter',
};

export const solanaContract: OmniPointHardhat = {
  eid: EndpointId.SOLANA_V2_MAINNET,
  address: 'AgrZJ5zTrQwkB13cEb7TDjLbe7PR577kTquEkNVemAXX', // your OFT Store address
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
          // TODO: uncomment this when ready to transfer delegate - run wire:
          //       pnpm hardhat lz:oapp:wire --oapp-config layerzero.config.ts --solana-secret-key $SOLANA_PRIVATE_KEY --solana-program-id $SOLANA_PROGRAM_ID
          // TODO: update owner with:
          //       pnpm hardhat lz:ownable:transfer-ownership --oapp-config layerzero.config.ts --solana-program-id $SOLANA_PROGRAM_ID --solana-secret-key $SOLANA_PRIVATE_KEY
          // config: {
          //   delegate: '0xE220329659D41B2a9F26E83816B424bDAcF62567',
          //   owner: '0xE220329659D41B2a9F26E83816B424bDAcF62567'
          // }
        },
        {
          contract: solanaContract,
          config: {
            delegate: 'sFjjLFuyvHDXLsMVXC9gdPTsxZBhoixuE7S6FSijV2W',
            owner: 'sFjjLFuyvHDXLsMVXC9gdPTsxZBhoixuE7S6FSijV2W'
          }
        }
    ],
    connections,
  };
}