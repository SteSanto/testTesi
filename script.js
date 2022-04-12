//Javascript


//  Speech recognition

   

    var recognition = new webkitSpeechRecognition();
    
        recognition.lang = "it";
        recognition.continuous = true;
        recognition.onresult = function (event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                
                
                var parola=event.results[i][0].transcript;
               
                if(parola==" punto"){
                    document.getElementById("nascosto").innerHTML+=".";
                }
                else if(parola==" virgola"){
                    document.getElementById("nascosto").innerHTML+=",";
                }
                else if(parola==" due punti"){
                    document.getElementById("nascosto").innerHTML+=":";
                }
                else{
                    document.getElementById("nascosto").innerHTML+=parola;
                   
                    
                }
            }
           
            
            
        }
        };
        function inizia(){
            recognition.start();
        }
    
        function stoppa () {  
            recognition.stop();
        }


//  Create pdf

function createPdf() {

    
	var doc = new jsPDF();
    
    var testo=document.getElementById("nascosto").innerHTML;
   
    //var result = testo.replace(/.{68}/g, '$&\n');
    
    var margins = {
        top: 10,
        bottom: 10,
        left: 10,
        width: 195
    };


    doc.text("TRASCRIZIONE APPUNTI",70,50);
    
    doc.addPage();
    
	//doc.text(result, 20,20);

    doc.fromHTML(                                   
        testo,
        margins.left,margins.top,{"width":195}
    )



    doc.save("appunti.pdf");
    
	

	

    doc.setProperties({
		title: 'Appunti',
		subject: 'trascrizione appunti voce-testo',
		author: 'Stefano Santomauro',
	});
}

//create Docx

function createDocx(){
    
    console.log("bottone premuto");
  
    
    
        var testo=document.getElementById("nascosto").innerHTML;
  
        const documento = new docx.Document({
          
          sections: [{


            
            children: [
              new docx.Paragraph({
                
                children: [
                  new docx.TextRun({
                    text: "TRASCRIZIONE APPUNTI",
                    font:"Calibri",
                    bold:true,
                    size:36,
                    border:"top",
                    HorizontalPositionAlign:"CENTER"
                    
                    
                    
                   
                  }),
                  
                ],
              }),
              
              new docx.Paragraph({
                children: [
                  
                  new docx.TextRun({
                    text: testo,
                    font:"Calibri",
                    size:24,
                    break: 1,
                  }),
                  
                ],
              }),
            ],
          }]
        });
      
  
      // Used to export the file into a .docx file
      docx.Packer.toBlob(documento).then(blob => {
        
        saveAs(blob, "example.docx");
        
      });
  
  
  }




//textarea editing
function textCopy(){
  var copyText = document.getElementById("nascosto").innerHTML;
  navigator.clipboard.writeText(copyText);
}

function textDelete(){
  document.getElementById("nascosto").innerHTML=null;
  

}

function textBold(){
 
  
  var element = document.getElementById("nascosto");
  element.classList.toggle("boldstyle");
  

}

