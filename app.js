let sharp =  require('sharp')

let path = process.argv[2]
let widht = Number(process.argv[3])
let height = Number(process.argv[4])

function resize (path, widht, height){

    sharp(path).resize({width:widht , height:height})
    .toFile('./temp/output_resize.jpg',(error)=>{

        if(error){
            console.log(error)
        }else{
            console.log("imagem redimencionada com sucesso")
        }
    })
}

resize(path,widht,height)