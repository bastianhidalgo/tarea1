import { useState } from "react";
import "./App.css";
import {getPerro} from "../src/Queries/query";
import { useQuery } from "react-query";
import { Image } from "mui-image";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';


import {
  CircularProgress,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Alert,
  Tooltip
} from "@mui/material";
import SimpleAccordion from "./Components/Header/Accordion/Accordion";

function Home() {

  const { data, isLoading, refetch } = useQuery("perro", getPerro, { refetchInterval: 5000 })
  const [aprobados, setAprobados] = useState([]);
  const [rechazados, setRechazados] = useState([]);
  const [contador, setContador] = useState(0);
  const descripcion = "Este perro es el mejor del mundo";

  const like = (img, descripcion) => {

    let perro = {
        id: contador,
        nombre: generateRandomString(5),
        img: img,
        descripcion: descripcion,
        state: true,
    }
    setContador(contador + 1);
    let perritosaprobados = aprobados.concat(perro);

    setAprobados(perritosaprobados.reverse());
}


const dislike = (img, descripcion) => {
    setContador(contador + 1);

    let perro = {
        id: contador,
        nombre: generateRandomString(5),
        img: img,
        descripcion: descripcion,
        state: false
    }
    let perritosrechazados = rechazados.concat(perro);
    setRechazados(perritosrechazados.reverse());
}

  const generateRandomString = (cant) => {
    const caracteres = 'abcdefghijkmnñopqrstuvwxyzaeiou';
    let cadena = ' ';
    const largo = caracteres.length;
    for (let i = 0; i < cant; i++) {
        cadena += caracteres.charAt(Math.floor(Math.random() * largo));
    }
    return cadena;
}

if (isLoading) {
    return (
        <div className="spinner">
            <CircularProgress color="success" />
        </div>
    )
}
const arrepentido = (perro) => {

    if (perro.state === true) {

        perro.state = false;
        let perros_rechazados = rechazados.concat(perro);
        setRechazados(perros_rechazados);
        let aprobados_actualizado = aprobados.filter((perro_original) => perro_original.nombre !== perro.nombre);

        setAprobados(aprobados_actualizado);

    } else if (perro.state === false) {

        perro.state = true;
        let perros_aprobados = aprobados.concat(perro);
        setAprobados(perros_aprobados);
        let rechazados_actualizado = rechazados.filter((perrox) => perrox.nombre !== perro.nombre);
        setRechazados(rechazados_actualizado);
    }

}

return (
    <Grid container

    sx={{
        display: "flex",
        width: '100%',
        flexDirection: "row",
        marginTop: "40px",
        justifyContent: "center",
       
    }}
>

    <Grid
     item
     md={3}
     sm={10}
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px",
            height: "auto",
            marginRight:"10px",
            backgroundColor:"white",
            
        }}
    >
        <Typography variant="h4" >Perro Candidato</Typography>

        <Card outlined="true" sx={{
            width: "70%",
            padding: "20px",
            display: "flex",
           
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: 3,
            marginTop: "10px",
            marginBottom: "10px"
        }}>
           
            <Image
                src={data.message}
                width="250px"
                height="250px"
                style={{
                    borderRadius: "20px"
                }}
            />
            <CardContent>
                {descripcion}
            </CardContent>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginTop: "5px"
                }}
            >
                <Tooltip title="Me gusta">
                    <ThumbUpIcon
                        disabled={isLoading}
                        sx={{
                            width: "50px",
                            cursor: "pointer",
                           
                        }}
                        color="primary"
                        onClick={() =>{ like(data.message, descripcion); refetch(getPerro) }}
                    >Aprobar</ThumbUpIcon>
                    </Tooltip>
                    <Tooltip title="No me gusta">
                    <ThumbDownIcon
                     disabled={isLoading}
                        sx={{ 
                            marginLeft: "50px",
                            width: "50px",
                            cursor: "pointer",

                        }}
                        color="error"
                        onClick={() => { dislike(data.message, descripcion); refetch(getPerro) }}
                    >Rechazar</ThumbDownIcon>
                    </Tooltip>
            </Box>

        </Card>


    </Grid>
    <Grid
        item
        md={3}
        sm={5}
        sx={{
            maxHeight: "500px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "scroll",
            backgroundColor: "white",
            flexWrap: "nowrap"
        }}
    >
        <Typography variant="h5">Aprobados</Typography>
        {
            aprobados.length > 0 ? aprobados.map((perro,idx) => {
                return (
                    <Grid item key={idx}
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px",
                            height: "450px",
                        }}
                    >
        <Card outlined="true" sx={{
                width:"70%",
                padding:"20px",
                display: "flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                marginTop:"10px",
                marginBottom:"10px",
                overflowY:"scroll"
               
            }}>
            <Typography variant="h4" >{perro.nombre}</Typography>
            <Image 
                src={perro.img}
                width="250px"
                height="250px"
                style={{
                    borderRadius:"20px"
                }}
             />
            <CardContent
                sx={{
                    padding:"10px"
                }}
            >
                <div>

                <SimpleAccordion description={descripcion}/>
                </div><Tooltip title="Arrepentirse">
                                        <ChangeCircleIcon
                                            sx={{
                                                cursor: "pointer",
                                                width:"30px",
                                                height:"30px",
                                                marginLeft:"120px"

                                            }}

                                            color="primary"
                                            onClick={() => { arrepentido(perro); refetch(getPerro) }}
                                        />
                                        </Tooltip>
            </CardContent>
        </Card>
                    </Grid>
                )
            }) : <Alert severity="error">No hay perritos aprobados</Alert>
        }
    </Grid>
    <Grid
        item
        md={3}
        sm={5}
        sx={{
            maxHeight: "500px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowY: "scroll",
            flexWrap: "nowrap",
            backgroundColor: "white",
            marginLeft:"10px"
        }}
    >
        <Typography variant="h5">Rechazados</Typography>
        {
            rechazados.length > 0 ? rechazados.map((perro, idx) => {
                return (
                    <Grid item key={idx}
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "10px"
                           
                        }}
                    >
 <Card outlined="true" sx={{
                width:"70%",
                padding:"20px",
                display: "flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                boxShadow: 3,
                marginTop:"10px",
                marginBottom:"10px",
                overflowY:"scroll"
               
            }}>
            <Typography variant="h4" >{perro.nombre}</Typography>
            <Image 
                src={perro.img}
                width="250px"
                height="250px"
                style={{
                    borderRadius:"20px"
                }}
             />
            <CardContent
                sx={{
                    padding:"10px"
                }}
            >
                <div>
                <SimpleAccordion description={descripcion}/>
                </div>
                <Tooltip title="Arrepentirse">
                                        <ChangeCircleIcon
                                            sx={{
                                                cursor: "pointer",
                                                width:"30px",
                                                height:"30px",
                                                marginLeft:"120px"
                                                
                                            }}

                                            color="primary"
                                            onClick={() => { arrepentido(perro); refetch(getPerro) }}
                                        />
                                        </Tooltip>
            </CardContent>
        </Card>
                    </Grid>
                )
            }) : <Alert severity="error">No hay perritos rechazados</Alert>
        }
    </Grid>

</Grid>
)
}

export default Home;
