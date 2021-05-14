import react from "react";
import SpringApiUrl from "../services/UserServiceApi";

import axios from "axios";


class Patient extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
     file: []
    };
  }

      handleFile(e){

        let file = e.target.files[0]

        this.setState({file: file})
  }

  handleUpload(e){
      let file = this.state.file
      let formdata = new FormData()
      formdata.append('file',file)

   fetch('http://localhost:8000/cancerMoonshot/uploadFile',{
     mode: 'no-cors',
      method: 'POST',
     body: formdata
       
    })
    
  .then(response => {
    alert(response.text())
    console.log("image uploaded")
  }).catch(err => {
    console.log(err)
  })  
    e.preventDefault();
    
          }
       

  componentDidMount() {
    SpringApiUrl.getApi().then((response) => {
      this.setState({ result: response.data });
    });
  }


  
  activateMenuItem(id) {
    // alert("id " + id);
    const div = document.getElementById(id);
    document.getElementById("listTB").classList.remove("active");
    document.getElementById("createTB").classList.remove("active");
    document.getElementById("notification").classList.remove("active");
    document.getElementById("abc").classList.remove("active");
    div.classList.add("active");

    var activeTab = "tab" + id;
    // alert("activeTab: " + activeTab);
    document.getElementById("tablistTB").style.display = "none";
    document.getElementById("tabcreateTB").style.display = "none";
    document.getElementById("tabnotification").style.display = "none";
    document.getElementById("tababc").style.display = "none";

    document.getElementById(activeTab).style.display = "block";
  }
  
  

  render() {
    return (
      <div>
       <div id="container" style={{ width: "100%", display: "flex" }}>
          <div id="first_row">
            <div
              className="neumorphic-card active"
              onClick={() => this.activateMenuItem("listTB")}
              id="listTB"
            >
              <i className="fas fa-columns" />
            </div>
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("createTB")}
              id="createTB"
            >
              <i className="fas fa-plus-square" />
            </div>
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("notification")}
              id="notification"
            >
              <i className="fas fa-calendar-check" />
            </div>
            <div
              className="neumorphic-card"
              onClick={() => this.activateMenuItem("abc")}
              id="abc"
            >
              <i className="fas fa-cogs" />
            </div>
          </div>
          <div id="content_div">
            <div id="tablistTB">
              <div id="content_header">
                <h3 className="text-left">Summary</h3>
              </div>
            </div>
            <div id="tabcreateTB"style={{ display: "none" }}>
              <div id="content_header">
                <h3 className="text-left">Treatment History</h3>
              </div>
            </div>
            <div id="tabnotification"style={{ display: "none" }}>
              <div id="content_header">
                <h3 className="text-left">Timeline</h3>
              </div>
              </div>
            <div id="tababc"style={{ display: "none" }}>
              
              <div id="datapre" >
        <div id="content_header"><h3 className="text-left">Data Preparation</h3></div>
        <form id="galleryform" >
          
          <div>
          
            <input id="files" type="file" name="file" onChange={(e)=>this.handleFile(e)}  style={{borderRadius: '5px', marginright: '100%'}}/>
            <p><strong>Choose a file</strong><span className="box__dragndrop"> or drag it here</span>.</p>
            <div id="header_buttons"><button id="filesupload" type="submit" onClick={(e)=>this.handleUpload(e)} style={{margin: '40px'}}>upload</button></div>
          </div>
      <div>
        
        <div className="box" style={{overflowY: 'scroll'}}><img  src={this.state.file} id="output" style={{width: '430px', marginTop: '15px', marginLeft: '10px'}} /></div>
        <div className="box" id="text" style={{overflowY: 'scroll'}} />
        <div className="box" />
      </div>
        </form>  	
        
      </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}


 export default Patient;
