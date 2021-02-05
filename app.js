let compress_images = require('compress-images');
const fs = require('fs');

let path = process.argv[2]
let outPath = process.argv[3];

async function compress(pathInput,outputPath){
    
    function readDir(dir){

        let arquivos = [];
        let struct = []
        

        fs
            .readdirSync(dir)

            .sort((a, b) => fs.statSync(dir +"/"+ a).mtime.getTime() - fs.statSync(dir +"/"+ b).mtime.getTime()) //É AQUI QUE A MÁGICA ACONTECE
            .forEach(file => {

                if( fs.lstatSync(dir+"/"+file).isFile() ){
                    arquivos.push(file)
                }else if( fs.lstatSync(dir+"/"+file).isDirectory() ){
                    // arquivos[file] = readDir(dir+"/"+file)
                    for(let i = 0; i< readDir(dir+"/"+file).length; i++){
                        let teste = readDir(dir+"/"+file)[i]
                        arquivos.push(file + '/' + teste);
                    }
                }
            })
        return arquivos
    }

    let dir = readDir(pathInput)
    
    for(var i = 0; i < dir.length; i++){

        console.log(dir[i]);
        
        compress_images(pathInput + dir[i], outputPath + dir[i], { compress_force: false, statistic: true, autoupdate: true }, false,
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
}
compress(path, outPath);

// node app.js C:/Users/jeffe/nodejs/Compressor-de-Imagens/img/ C:/Users/jeffe/nodejs/Compressor-de-Imagens/compressed/