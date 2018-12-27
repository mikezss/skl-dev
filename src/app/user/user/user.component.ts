import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../../master/master.service';
import {UserService} from '../user.service';
import {OrgService} from '../../org/org.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  formcolnames: any[] = [];
  formdata: any = {};

  constructor(private os: OrgService, private us: UserService, private ms: MasterService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'textbox'},
      {'Controlname': 'Username', 'Controltype': 'textbox'},
      {'Controlname': 'Isleader', 'Controltype': 'checkbox'},
      {
        'Controlname': 'Userlevel', 'Controltype': 'select',
        'options': [{'label': 'Generaluser', 'value': '0'},
          {'label': 'Manageruser', 'value': '1'},
          {'label': 'Superuser', 'value': '2'}, {'label': 'Developuser', 'value': '3'},
          {'label': 'PM', 'value': '4'}]
      },
      {'Controlname': 'Orgid', 'Controltype': 'treeselect', 'nodes': []},
      {'Controlname': 'Expireddate', 'Controltype': 'datepicker'},
      {'Controlname': 'Loginip', 'Controltype': 'textbox'},
      {'Controlname': 'Postid', 'Controltype': 'select', 'options': []},
      {'Controlname': 'Email', 'Controltype': 'textbox'},
      {'Controlname': 'Remark', 'Controltype': 'textarea'},
    ];

    let nodes = [
      new NzTreeNode({
        title: 'root',
        key: 'root'
      })
    ];
    this.os.getorgsjson().subscribe(data => {
      nodes[0].addChildren(data);
      for (let colname of this.formcolnames) {
        if (colname.Controltype == 'treeselect' && colname.Controlname == 'Orgid') {
          colname.nodes = nodes;
        }
      }


    });

  }

  dosubmit(event) {
    console.log(event);
    console.log(this.formdata);

    if (event == 'save') {
      this.ms.saveuser(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {

        }
      });
    } else {
      this.ms.deleteuserbyid(this.formdata.Userid).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {

        }
      });

    }

  }

}
