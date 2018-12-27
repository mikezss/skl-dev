import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../master/master.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  formdata: any = {};
  formcolnames: any[] = [];

  constructor(private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'atcomplete', 'datasource': []},
      {
        'Controlname': 'Sex', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'Male', value: '0', checked: false},
          {label: 'Female', value: '1', checked: false}]
      },
      {'Controlname': 'Residence_addres', 'Controltype': 'textbox'},
      {
        'Controlname': 'Residence_type', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'City', value: '0', checked: false},
          {label: 'Notcity', value: '1', checked: false}]
      },
      {'Controlname': 'Employeeid', 'Controltype': 'textbox'},
      {
        'Controlname': 'Marital_status', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'Marry', value: '0', checked: false},
          {label: 'NotMarry', value: '1', checked: false}]
      },
      {'Controlname': 'Native_place', 'Controltype': 'textbox'},
      {'Controlname': 'Birthday', 'Controltype': 'datepicker'},
      {'Controlname': 'School', 'Controltype': 'textbox'},
      {'Controlname': 'Major', 'Controltype': 'textbox'},
      {'Controlname': 'Degree', 'Controltype': 'select', 'options': [], 'nzMode': 'default'},
      {'Controlname': 'Idcard', 'Controltype': 'textbox'},
      {
        'Controlname': 'Country', 'Controltype': 'select', 'options': [{label: 'China', value: '0', checked: false},
          {label: 'Japan', value: '1', checked: false}], 'nzMode': 'default'
      },
      {'Controlname': 'Work_date', 'Controltype': 'datepicker'},
      {'Controlname': 'Address', 'Controltype': 'textbox'},
      {'Controlname': 'Mobile', 'Controltype': 'textbox'},
      {'Controlname': 'Contact_way', 'Controltype': 'textbox'},
      {'Controlname': 'Contact_person', 'Controltype': 'textbox'},
      {'Controlname': 'Entrydate', 'Controltype': 'datepicker'},
      {'Controlname': 'English_name', 'Controltype': 'textbox'},
      {'Controlname': 'Professional_title', 'Controltype': 'textbox'},
      {'Controlname': 'Orgid', 'Controltype': 'label'},
      {'Controlname': 'Postid', 'Controltype': 'select', 'options': [], 'nzMode': 'default'},
      {
        'Controlname': 'Carborrow_qualification', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'Yes', value: '0', checked: false},
          {label: 'No', value: '1', checked: false}]
      },
      {
        'Controlname': 'Rank', 'Controltype': 'select', 'options': [{label: 'M2', value: '0', checked: false},
          {label: 'M1', value: '1', checked: false}, {label: 'S3', value: '2', checked: false},
          {label: 'S2-A', value: '3', checked: false}, {label: 'S2-B', value: '4', checked: false},
          {label: 'S1', value: '5', checked: false}, {label: 'Other', value: '6', checked: false}], 'nzMode': 'default'
      },
      {'Controlname': 'Key_user', 'Controltype': 'textbox'},
      {'Controlname': 'Work_card', 'Controltype': 'textbox'},
      {'Controlname': 'Guard_card', 'Controltype': 'textbox'},
      {'Controlname': 'Computer', 'Controltype': 'textbox'},
      {'Controlname': 'Ext', 'Controltype': 'textbox'},
      {'Controlname': 'Computer', 'Controltype': 'textbox'},
      {
        'Controlname': 'Computer_level', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'Verygood', value: '0', checked: false},
          {label: 'Good', value: '1', checked: false}, {label: 'Normal', value: '1', checked: false}]
      },
      {'Controlname': 'Computer_cert', 'Controltype': 'textbox'},
      {
        'Controlname': 'English_level', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'Grade4', value: '4', checked: false},
          {label: 'Grade6', value: '6', checked: false}, {label: 'Grade8', value: '8', checked: false}]
      },
      {'Controlname': 'English_cert', 'Controltype': 'textbox'},
      {
        'Controlname': 'Japanese_level', 'Controltype': 'radiogroup', 'radiogroup': [{label: 'Grade1', value: '1', checked: false},
          {label: 'Grade2', value: '2', checked: false}, {label: 'Grade3', value: '3', checked: false}, {
            label: 'Grade4',
            value: '4',
            checked: false
          }]
      },
      {'Controlname': 'Japanese_cert', 'Controltype': 'textbox'},
      {'Controlname': 'Speciality', 'Controltype': 'textbox'},
      {'Controlname': 'Speciality_cert', 'Controltype': 'textbox'}

    ];

    this.ms.getalluser().subscribe(data => {
      let conditionoptions: any[] = [];
      // conditionoptions.push({"label":"root","value":"root"});
      for (let condition of data) {
        conditionoptions.push(condition.Userid);
      }
      console.log(conditionoptions);
      for (let colname of this.formcolnames) {
        if (colname.Controltype == 'atcomplete' && colname.Controlname == 'Userid') {
          colname.datasource = conditionoptions;
          break;
        }
      }
    });
  }

  dosubmit(event) {
    // console.log(event);
    console.log(this.formdata);
    if (event == 'query') {
      this.ms.getuser({'Userid': this.formdata.Userid}).subscribe(response => {
        // console.log(response);

        this.formdata = response[0];
      });
    } else {
      this.ms.updateuserinfo(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

}
