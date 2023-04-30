// import ipfsAPI from 'ipfs-http-client';
// import { create } from 'ipfs-http-client';
// const ipfs = create({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https',
//   });
// const ipfs = create()
// const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'});
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY5QzgwYUM0OTdGYjdDYjY3MTRhYjAyNDk5MjU1MWE0MTc3RENmNjIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAxOTEyODM4MzUsIm5hbWUiOiJjaGFyaXR5In0.VkHRLQU9hvW1FUkV-7ixfb2sZWq5ZzAQPsPis-eHvKo";

const ipfs = new Web3Storage({ token: NFT_STORAGE_KEY });

export default ipfs;