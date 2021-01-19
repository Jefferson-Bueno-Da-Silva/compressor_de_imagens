let sharp =  require('sharp')
let compress_images = require('compress-images')

let path = process.argv[2]
let widht = Number(process.argv[3])
let height = Number(process.argv[4])

function resize (inputPath,outputPath, widht, height){

    sharp(inputPath).resize({width:widht , height:height})
    .toFile(outputPath,(error)=>{

        if(error){
            console.log(error)
        }else{
            console.log(outputPath)
            console.log("imagem redimencionada com sucesso")
            compress(outputPath, "./compressed/")

        }
    })
}

function compress(pathInput,outputPath){
    compress_images(pathInput, outputPath, { compress_force: false, statistic: true, autoupdate: true }, false,
        { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
        { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
        { svg: { engine: "svgo", command: "--multipass" } },
        { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
        function (error, completed, statistic) {
        console.log("-------------");
        console.log(error);
        console.log(completed);
        console.log(statistic);
        console.log("-------------");
        });
}

resize(path,'./temp/output_resize.jpg',widht,height)