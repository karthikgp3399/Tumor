import react from "react";
import SpringApiUrl from "../services/UserServiceApi";
import SpringApiDocsListUrl from '../services/DoctorsList';
import './Tumor.css';
//import axios from 'axios';
import DatePicker from 'react-datetime';
import moment from 'moment-timezone';
import 'react-datetime/css/react-datetime.css';


class Tumorboard extends react.Component {	
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      docsList: [],	
	          name: "Generer",
            purpose: "Review",
            tbDate: "",
            start_time:(moment()),
            duration: 15,
            mode: "VIDEO",
            location: "",
            video_link: "",
            status: "REQUESTED",
            priority: 3,
            frequency_in_days: 0,
            //notes :$("#videoLink").val(),
            inserted_time: "2018-06-06 12:12:12",
            updated_time: "2018-06-06 12:12:12",
            patient_id_fk: "",
            presenting_doc: "",
            attending_doc: [],
            patientName: "",
            cancertype: "",
            patient: "present",
            display: "none",
            videolinkdisabled:false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeAttendingDoc = this.handleChangeAttendingDoc.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    Changedate = (e) => {
        this.setState({
            start_time: e
        });
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if((name=="mode") && (value!="VIDEO") ) {
            this.setState( {videolinkdisabled: true} )
        } else if((name=="mode") && (value=="VIDEO") ) {
            this.setState( {videolinkdisabled: false} )
        }
        this.setState({
            [name]: value
        });
    }

    handleChangeAttendingDoc(event) {
        var options = event.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ attending_doc: value });
    }


componentDidMount() {
    SpringApiUrl.getApi().then((response) => {
      this.setState({ result: response.data });
    });	
	 
  SpringApiDocsListUrl.getApi().then((response) => {
            this.setState({ docsList: response.data })
        });
  }
	


  activateMenuItem(id) {
    const div = document.getElementById(id);
    document.getElementById("listTB").classList.remove("active");
    document.getElementById("createTB").classList.remove("active");
    document.getElementById("notification").classList.remove("active");
    document.getElementById("abc").classList.remove("active");
    div.classList.add("active");

    var activeTab = "tab" + id;
    document.getElementById("tablistTB").style.display = "none";
    document.getElementById("tabcreateTB").style.display = "none";
    document.getElementById("tabnotification").style.display = "none";
    document.getElementById("tababc").style.display = "none";

    document.getElementById(activeTab).style.display = "block";
  }	  


onKeyUp = event => {
        if (event.charCode === 13) {
            this.setState({ patient_id_fk: event.target.value });
        }
        fetch('http://localhost:8000/cancerMoonshot/getPatientDetailsByID?id=' + event.target.value)
            .then(response => response.json())
            .then((data) => {
                { this.setState({ name: data.cancertype }); }
                console.log(data.name)
                document.getElementById("alertText").style.display = "none";
            })
            .catch(e => {
                console.log(e);
                document.getElementById("alertText").style.display = "block";
            });
 
    };



    handleSubmit = event => {

        if(this.state.patient_id_fk=="")
        {
            alert("Please enter Patient ID !!") ;
            return ;
        }
        if((this.state.mode=="VIDEO") && (this.state.video_link==""))
        {
            alert("Please enter link for Video Conference !!") ;
            return ;
        }

        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            name: this.state.name,
            patient_id_fk: this.state.patient_id_fk,
            mode: this.state.mode,
            status: "REQUESTED",
            purpose: this.state.purpose,
            start_time: this.state.start_time,
            requested_time: this.state.start_time,
            end_time: "2025-12-12 12:12:12",
            duration: this.state.duration,
            location: this.state.location,
            video_link: this.state.video_link,
            priority: this.state.priority,
            frequency_in_days: this.state.frequency_in_days,
            inserted_time: "2018-06-06 12:12:12",
            updated_time: "2018-06-06 12:12:12",
            presenting_doc: this.state.presenting_doc,
            attending_doc: this.state.attending_doc.toString()
        }

        fetch('http://localhost:8000/cancerMoonshot/trial', {
            mode: 'no-cors',
            method: "POST",
            body: JSON.stringify(requestOptions),
            headers: { "Content-type": "application/json; charset=UTF-8", "Access-Control-Allow-Origin": "*" }
        })
            
            .then(json => console.log(json));
        //.catch(err => console.log(err)); 
    };



  

render() {	 

// disable past dates
       const yesterday = moment().subtract(1, 'day');
        const disablePastDt = current => {
            return current.isAfter(yesterday);
        };

        const customDates = ['2021-04-22', '2021-04-25', '2021-04-26'];
        const disableCustomDt = current => {
            return !customDates.includes(current.format('YYYY-MM-DD'));
        }

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
                <h3 className="text-left">UpComing meetings</h3>
                <table class="table">
                  <thead>
                    <tr>
                      <td scope="row"> ID </td>
                      <td scope="row"> Tumor Board </td>
                      <td scope="row"> Date&Time </td>
                      <td scope="row"> MeetingDashboard </td>
                      <td scope="row"> Presentation </td>
                      <td scope="row"> AIOpinion </td>
                      <td scope="row">SartMeeting</td>
                      <td scope="row">CancelMeeting</td>
                      
                    </tr>
                  </thead>
                  <tbody >
                    {this.state.result.map((user) => (
                      <tr key={user.tbid}>
                        <td> {user.tbid}</td>
                        <td> {user.name}</td>
                        <td> {user.start_time}</td>
                        <td> view&edit</td>
                        <td> {user.presentationlink}</td>
                        <td> {user.aiopinionlink}</td>
                        <td> {user.startmeeting}</td>
                        <td> {user.canclemeeting}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
                </div>
                        <div id="tabcreateTB" style={{ display: "none" }}>
                           <div id="content_header"><h3>Create New Tumorboard</h3></div>
                            <div id="alertText" style={{ display: "none", color: "red" }}><b>Patient with the specified ID does not exist</b></div>
                            <div id="container"
                                className="theme theme_font_neoskeuo theme_space_neoskeuo theme_color_neoskeuo"
                                style={{ display: "flex" }}
                            >
                                <div id="testModal" style={{ width: "70%" }}>

                                    <section>
                                        <div>

                                            <div style={{ display: "flex" }}>
                                                <div className="w_sec w_sec_select_50">
                                                    <h5>Patient ID/Mobile No*</h5>
                                                    <input name="patient_id_fk" type="text" id="patient_id_fk" value={this.state.patient_id_fk} onChange={this.handleInputChange} onKeyPress={this.onKeyUp} />
                                                </div>
                                                <div className="w_sec w_sec_select_50">
                                                    <h5>Location</h5>
                                                    <select className="select" name="location" value={this.state.location} onChange={this.handleInputChange}>
                                                        <option value={"Bangalore"}>Bangalore</option>
                                                        <option value={"Chennai"}>Chennai</option>
                                                        <option value={"Hyderabad"}>Hyderabad</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Date*</h5>
                                               
                                                <DatePicker id="start_time" name="start_time" value={this.state.start_time} isValidDate={disablePastDt} minDate={new Date(2021, 4, 27)} onChange={this.Changedate} />
                                                
                                                 </div>

                                            <div className="w_sec w_sec_select_50">
                                                <h5>Duration</h5>
                                                <select className="select" id="duration" name="duration" value={this.state.duration} onChange={this.handleInputChange}>
                                                    <option>In Minutes</option>
                                                    <option value={"15"}>15</option>
                                                    <option selected value={"30"}>30</option>
                                                    <option value={"45"}>45</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Tumor Board Type*</h5>
                                                <select className="select" id="name" name="name" value={this.state.name} onChange={this.handleInputChange}>
                                                    <option selected value={"General"}>General</option>
                                                    <option value={"Breast"}>Breast</option>
                                                    <option value={"Lung"}>Lung</option>
                                                    <option value={"Brain"}>Brain</option>
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Purpose*</h5>
                                                <select className="select" id="purpose" name="purpose" value={this.state.purpose} onChange={this.handleInputChange}>
                                                    <option value={"Review"}>Review</option>
                                                    <option value={"Follow-Up"}>Follow-Up</option>
                                                    <option value={"Relapse"}>Relapse</option>
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Priority</h5>
                                                <select id="priority" className="select" name="priority" value={this.state.priority} onChange={this.handleInputChange}>
                                                    <option value={1}>High</option>
                                                    <option value={2}>Medium</option>
                                                    <option value={3} selected>Regular</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>
                                    <section>
                                        <div style={{ display: "flex" }}>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Mode*</h5>
                                                <select className="select" name="mode" value={this.state.mode} onChange={this.handleInputChange}>
                                                    <option value={"VIDEO"} selected>Virtual</option>
                                                    <option value={"AUDIO"}>Audio</option>
                                                    <option value={"INPERSON"}>In Person</option>
                                                </select>
                                            </div>
                                            <div className="w_sec w_sec_select_50">
                                                <h5>Video Link*</h5>
                                                <input
                                                    type="text"
                                                    className="input decorator decorator_indent-b_xl"
                                                    id="video_link"
                                                    placeholder="VideoConferencingLink"
                                                    name="video_link" value={this.state.video_link} onChange={this.handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <div style={{ paddingTop: 7, paddingLeft: 130 }}>
                                    <div className="w_sec w_sec_select_50" style={{ width: '75%' }}>
                                        <h5>Presenting Doctor*</h5>
                                        <select className="select" style={{ width: '300px' }} name="presenting_doc" value={this.state.presenting_doc} onChange={this.handleInputChange}>
                                            {
                                                this.state.docsList.map(
                                                    doc =>

                                                        <option value={doc.doctorId}>{doc.doctorName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="w_sec w_sec_select_50" style={{ width: '75%' }}>
                                        <h5>Attending Doctors*</h5>
                                        <select className="select" style={{ width: '300px' }} id="attending_doc" name="attending_doc" multiple={true} value={this.state.attending_doc} onChange={this.handleChangeAttendingDoc}>
                                            {
                                                this.state.docsList.map(
                                                    doc =>

                                                        <option value={doc.doctorId}>{doc.doctorName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="w_sec w_sec_select_50" style={{ width: '75%' }}>
                                        <h5>Repeat Frequency</h5>
                                        <select className="select" id="frequency_in_days" name="frequency_in_days" value={this.state.frequency_in_days} onChange={this.handleInputChange}>
                                            <option value={0}>None</option>
                                            <option value={30}>Monthly</option>
                                            <option value={180}>Bi-Annual</option>
                                            <option value={120}>Tri-Annual</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div id="header_buttons">
                                <button onClick={this.handleSubmit}>Submit</button>
                            </div>

                        </div>
                        
            <div id="tabnotification"style={{ display: "none" }}>
              <div id="content_header">
                <h3 className="text-left">Notification</h3>
              </div>
              <table class="table shadow-soft rounded">
                <thead>
                  <tr>
                    <td scope="row">
                      <b> Patient ID </b>
                    </td>
                    <td scope="row">
                      <b> Tumor Board </b>
                    </td>
                    <td scope="row">
                      <b> Date&Time </b>
                    </td>
                    <td scope="row">
                      <b> Cases Assigned </b>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.result.map((user) => (
                    <tr key={user.tbid}>
                      <td> {user.tbid}</td>
                      <td> {user.tbtype}</td>
                      <td> {user.date}</td>
                      <td> {user.casescount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div id="tababc"style={{ display: "none" }}>
              <div id="content_header">
                <h3 className="text-left"> AI Treatment</h3>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    );
  }
}

export default Tumorboard;
