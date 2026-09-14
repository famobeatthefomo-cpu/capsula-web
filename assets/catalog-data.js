/* Cápsula — sample catalogue.
   FICTIONAL placeholder data built only to show how the listing works.
   These are not real products, real shops or actual Cápsula partners;
   the real database, its characteristics and the filter rules come later. */
window.CAPSULA_CATALOG = {
  products: [
    { id:"poltrona-nido",      cat:"seating",   price:480, unit:"",    shop:"Casa Forma",         city:"bcn", tags:["boucle","rovere"],        ship:true,  pickup:true  },
    { id:"lampada-alba",       cat:"lighting",  price:165, unit:"",    shop:"Lumen Studio",       city:"rom", tags:["vetro","luce-diffusa"],   ship:true,  pickup:false },
    { id:"tavolino-terra",     cat:"tables",    price:290, unit:"",    shop:"Taller Norte",       city:"bcn", tags:["rovere","opaca"],         ship:true,  pickup:true  },
    { id:"rivestimento-calma", cat:"wallcover", price:62,  unit:"/m²", shop:"Materia Roma",       city:"rom", tags:["ceramica","beige"],       ship:false, pickup:true  },
    { id:"tenda-bruma",        cat:"textiles",  price:110, unit:"",    shop:"Tela Barcelona",     city:"bcn", tags:["lino","sabbia"],          ship:true,  pickup:true  },
    { id:"applique-sfera",     cat:"lighting",  price:145, unit:"",    shop:"Officina Luce",      city:"rom", tags:["metallo","luce-calda"],   ship:true,  pickup:false },
    { id:"credenza-riva",      cat:"storage",   price:760, unit:"",    shop:"Fusta Vella",        city:"bcn", tags:["frassino","naturale"],    ship:false, pickup:true  },
    { id:"tappeto-duna",       cat:"textiles",  price:230, unit:"",    shop:"Teixits Mar",        city:"bcn", tags:["lana","tessitura"],       ship:true,  pickup:true  },
    { id:"sgabello-orto",      cat:"seating",   price:95,  unit:"",    shop:"Bottega Tevere",     city:"rom", tags:["faggio","cera"],          ship:true,  pickup:true  },
    { id:"specchio-eco",       cat:"accessories",price:180,unit:"",    shop:"Vetreria Trastevere",city:"rom", tags:["vetro","ottone"],         ship:true,  pickup:false },
    { id:"pittura-argilla",    cat:"finishes",  price:48,  unit:"/L",  shop:"Colors Gràcia",      city:"bcn", tags:["calce","traspirante"],    ship:false, pickup:true  },
    { id:"mensola-linea",      cat:"storage",   price:120, unit:"",    shop:"Fusta Vella",        city:"bcn", tags:["rovere","acciaio"],       ship:true,  pickup:true  }
  ],
  /* the filters the Profile imposes — locked, shown with a padlock */
  locked: ["palette","contrast","material","finish","stimulus"],
  i18n: {
    es: {
      name:{ "poltrona-nido":"Butaca Nido","lampada-alba":"Lámpara Alba","tavolino-terra":"Mesita Terra","rivestimento-calma":"Revestimiento Calma","tenda-bruma":"Cortina Bruma","applique-sfera":"Aplique Esfera","credenza-riva":"Aparador Riva","tappeto-duna":"Alfombra Duna","sgabello-orto":"Taburete Orto","specchio-eco":"Espejo Eco","pittura-argilla":"Pintura Arcilla","mensola-linea":"Estante Línea" },
      cat:{ seating:"Asientos",lighting:"Iluminación",tables:"Mesas",wallcover:"Revestimientos",textiles:"Textiles",storage:"Almacenaje",accessories:"Complementos",finishes:"Acabados" },
      tag:{ boucle:"Tejido bouclé",rovere:"Roble",vetro:"Vidrio opalino","luce-diffusa":"Luz difusa",opaca:"Acabado mate",ceramica:"Cerámica mate",beige:"Beige cálido",lino:"Lino natural",sabbia:"Arena",metallo:"Metal satinado","luce-calda":"Luz cálida",frassino:"Fresno",naturale:"Natural",lana:"Lana virgen",tessitura:"Tejido plano",faggio:"Haya maciza",cera:"Cera natural",ottone:"Latón",calce:"Cal natural",traspirante:"Transpirable",acciaio:"Acero" },
      city:{ bcn:"Barcelona", rom:"Roma" },
      lock:{ palette:"Paleta — cálida y desaturada",contrast:"Contraste — medio-bajo",material:"Materialidad — natural y matérica",finish:"Acabado — predominantemente mate",stimulus:"Estimulación visual — controlada" }
    },
    ca: {
      name:{ "poltrona-nido":"Butaca Niu","lampada-alba":"Làmpada Alba","tavolino-terra":"Tauleta Terra","rivestimento-calma":"Revestiment Calma","tenda-bruma":"Cortina Bruma","applique-sfera":"Aplic Esfera","credenza-riva":"Bufet Riva","tappeto-duna":"Catifa Duna","sgabello-orto":"Tamboret Hort","specchio-eco":"Mirall Eco","pittura-argilla":"Pintura Argila","mensola-linea":"Prestatge Línia" },
      cat:{ seating:"Seients",lighting:"Il·luminació",tables:"Taules",wallcover:"Revestiments",textiles:"Tèxtils",storage:"Emmagatzematge",accessories:"Complements",finishes:"Acabats" },
      tag:{ boucle:"Teixit bouclé",rovere:"Roure",vetro:"Vidre opalí","luce-diffusa":"Llum difusa",opaca:"Acabat mat",ceramica:"Ceràmica mat",beige:"Beix càlid",lino:"Lli natural",sabbia:"Sorra",metallo:"Metall setinat","luce-calda":"Llum càlida",frassino:"Freixe",naturale:"Natural",lana:"Llana verge",tessitura:"Teixit pla",faggio:"Faig massís",cera:"Cera natural",ottone:"Llautó",calce:"Calç natural",traspirante:"Transpirable",acciaio:"Acer" },
      city:{ bcn:"Barcelona", rom:"Roma" },
      lock:{ palette:"Paleta — càlida i desaturada",contrast:"Contrast — mitjà-baix",material:"Materialitat — natural i matèrica",finish:"Acabat — predominantment mat",stimulus:"Estimulació visual — controlada" }
    },
    it: {
      name:{ "poltrona-nido":"Poltrona Nido","lampada-alba":"Lampada Alba","tavolino-terra":"Tavolino Terra","rivestimento-calma":"Rivestimento Calma","tenda-bruma":"Tenda Bruma","applique-sfera":"Applique Sfera","credenza-riva":"Credenza Riva","tappeto-duna":"Tappeto Duna","sgabello-orto":"Sgabello Orto","specchio-eco":"Specchio Eco","pittura-argilla":"Pittura Argilla","mensola-linea":"Mensola Linea" },
      cat:{ seating:"Sedute",lighting:"Illuminazione",tables:"Tavoli",wallcover:"Rivestimenti",textiles:"Tessili",storage:"Contenitori",accessories:"Complementi",finishes:"Finiture" },
      tag:{ boucle:"Tessuto bouclé",rovere:"Rovere",vetro:"Vetro opalino","luce-diffusa":"Luce diffusa",opaca:"Finitura opaca",ceramica:"Ceramica opaca",beige:"Beige caldo",lino:"Lino naturale",sabbia:"Sabbia",metallo:"Metallo satinato","luce-calda":"Luce calda",frassino:"Frassino",naturale:"Naturale",lana:"Lana vergine",tessitura:"Tessitura piatta",faggio:"Faggio massello",cera:"Cera naturale",ottone:"Ottone",calce:"Calce naturale",traspirante:"Traspirante",acciaio:"Acciaio" },
      city:{ bcn:"Barcellona", rom:"Roma" },
      lock:{ palette:"Palette — calda e desaturata",contrast:"Contrasto — medio-basso",material:"Materialità — naturale e materica",finish:"Finitura — prevalentemente opaca",stimulus:"Stimolazione visiva — controllata" }
    },
    en: {
      name:{ "poltrona-nido":"Nido Armchair","lampada-alba":"Alba Lamp","tavolino-terra":"Terra Side Table","rivestimento-calma":"Calma Wall Tile","tenda-bruma":"Bruma Curtain","applique-sfera":"Sfera Wall Light","credenza-riva":"Riva Sideboard","tappeto-duna":"Duna Rug","sgabello-orto":"Orto Stool","specchio-eco":"Eco Mirror","pittura-argilla":"Argilla Paint","mensola-linea":"Linea Shelf" },
      cat:{ seating:"Seating",lighting:"Lighting",tables:"Tables",wallcover:"Wall coverings",textiles:"Textiles",storage:"Storage",accessories:"Accessories",finishes:"Finishes" },
      tag:{ boucle:"Bouclé fabric",rovere:"Oak",vetro:"Opal glass","luce-diffusa":"Diffused light",opaca:"Matt finish",ceramica:"Matt ceramic",beige:"Warm beige",lino:"Natural linen",sabbia:"Sand",metallo:"Satin metal","luce-calda":"Warm light",frassino:"Ash",naturale:"Natural",lana:"Virgin wool",tessitura:"Flat weave",faggio:"Solid beech",cera:"Natural wax",ottone:"Brass",calce:"Natural lime",traspirante:"Breathable",acciaio:"Steel" },
      city:{ bcn:"Barcelona", rom:"Rome" },
      lock:{ palette:"Palette — warm and desaturated",contrast:"Contrast — medium-low",material:"Materiality — natural and tactile",finish:"Finish — mostly matt",stimulus:"Visual stimulation — controlled" }
    }
  }
};
