const changeBg= (description, principal, icon) =>{
    if(principal==="Thunderstorm") return "/fondoTormentaElectrica.svg"
    if((icon==="09n") || (icon==="09d")) return "/fondoAguacero.svg"
    if((description==="lluvia ligera")||(description==="lluvia moderada")) return "/fondoLluvia.svg"
    if((icon==="13n") || (icon==="13d") ) return "/fondoNieve.svg"
    if((icon==="50n") || (icon==="50d")) return "/fondoVentoso.svg"
    if(principal==="Clear") return "/fondoCieloDespejado.svg"
    if(description==="algo de nubes") return "/fondoPocasNubes.svg"
    if(description==="nubes dispersas") return "/fondoProbablementeNublado.svg"
    if((description==="nubes") || (description==="muy nuboso")) return "/fondoMayormenteNublado.svg"
}
export {changeBg};

//algo de nubes=pocas nubes 
//lluvia de gran intensidad=aguacero
//nubes, muy nuboso=mayormente nublado