import AWS from 'aws-sdk';

AWS.config.update({
    credentials : {
        accessKeyId : process.env.AWS_KEY,
        secretAccessKey : process.env.AWS_SECRET,
    },
});

export const uploadToS3 = async (file, userId, folderName) => {
    const {filename, createReadStream} = await file
    const readStream = createReadStream();
    const objectName = `${folderName}/${userId.id}-${Date.now()}-${filename}`
    const upload = await new AWS.S3().upload({
        Bucket : "my-personel-instaclone-project",
        Key : objectName,
        ACL : "public-read",
        Body : readStream,
    })
    .promise();

    return upload.Location;
}