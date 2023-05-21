import { BlobServiceClient } from "@azure/storage-blob";

//Constants
const storageAccountName = "ispstorage143";
const sasToken =
  "sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-10-01T04:42:48Z&st=2022-09-30T20:42:48Z&spr=https,http&sig=z9mzn5KohUvFKCgtvKEkgbBeoQ7%2BenRdUUNdBJxHd5s%3D";


const getBlobsInContainer = async (containerClient, containerName) => {
  //StateVariables
  const returnedBlobUrls = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
};

const createBlobInContainer = async (containerClient, file, blobName) => {
  //Constants
  const blobClient = containerClient.getBlockBlobClient(blobName);
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);

  //Get Tags
  const tags = await blobClient.getTags();
  return tags
};


const uploadFileToBlob = async (file, blobName, containerName="testing") => {
  if (!file) return [];

  //Constants
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  const containerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: "container",
  });

  // upload file
  const tags = await createBlobInContainer(containerClient, file, blobName);
  console.log(`tags for ${blobName} = ${JSON.stringify(tags.tags)}`);

  // get list of blobs in container
  const blobs = getBlobsInContainer(containerClient, containerName);
  return blobs
};

export default uploadFileToBlob;
