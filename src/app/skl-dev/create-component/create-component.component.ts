import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../../master/master.service';
import {DevService} from '../dev.service';
import {Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {map, filter, scan, retry} from 'rxjs/operators';
import {LoginService} from '../../login/login.service';

import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions} from 'ng-zorro-antd';

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.css']
})
export class CreateComponentComponent implements OnInit {
  @ViewChild('treeCom') treeCom;
  searchValue;
  selectedkey = '';

  tabindex: any = 0;
  ngutter = 40;
  ncolcount = 1;
  haslist = false;
  buttons: any[] = [];

  baseinfotitle = 'base info';
  designtitle = 'design component';

  formcolnames: any[] = [];
  formdata: any = {};

  designlistdata: any[] = [];
  designformdata: any = {};

  listcolnames: any[] = [];
  listdata: any[] = [];
  havesubmitted = false;

  nodes: any[] = [];

  constructor(private ls: LoginService, private ds: DevService, private ms: MasterService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Componentname', 'Controltype': 'textbox'},
      {
        'Controlname': 'Parentid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/dev/getallcomponentoptions'
      },
      {'Controlname': 'Title', 'Controltype': 'textbox'},
      {'Controlname': 'Buttons', 'Controltype': 'select', 'options': [], 'nzMode': 'multiple', 'datasource': '/assets/buttons.json'},
      {'Controlname': 'Style', 'Controltype': 'select', 'options': [], 'nzMode': 'default', 'datasource': '/assets/pagestyles.json'},
      {'Controlname': 'Gutter', 'Controltype': 'textbox'},
      {'Controlname': 'Colcount', 'Controltype': 'textbox'},
      {'Controlname': 'Componentlevel', 'Controltype': 'label'},
      {'Controlname': 'Godirectory', 'Controltype': 'textbox'},
      {'Controlname': 'Ngdirectory', 'Controltype': 'textbox'}
    ];
    this.listcolnames = [
      {'Controlname': 'Seq', 'Controltype': 'number', 'minvalue': 1, 'maxvalue': 9999, 'stepvalue': 1, 'width': '100px'},
      {'Controlname': 'Controlname', 'Controltype': 'textbox', 'width': '300px'},
      {'Controlname': 'Controldisplayname', 'Controltype': 'textbox', 'width': '400px'},
      {
        'Controlname': 'Controltype',
        'Controltype': 'select',
        'options': [],
        'width': '300px',
        'nzMode': 'default',
        'datasource': '/assets/controls.json'
      },
      {'Controlname': 'Rows', 'Controltype': 'number', 'minvalue': 1, 'maxvalue': 999, 'stepvalue': 1, 'width': '50px'},
      {'Controlname': 'Filetype', 'Controltype': 'textbox', 'width': '150px'},
      {'Controlname': 'Ismultiple', 'Controltype': 'checkbox', 'width': '50px'},
      {'Controlname': 'Filesize', 'Controltype': 'number', 'minvalue': 1, 'maxvalue': 999999, 'stepvalue': 1, 'width': '50px'},
      {'Controlname': 'Islimit', 'Controltype': 'checkbox', 'width': '50'},
      {'Controlname': 'Limitfileqty', 'Controltype': 'number', 'minvalue': 1, 'maxvalue': 999, 'stepvalue': 1, 'width': '50px'},
      {'Controlname': 'Minvalues', 'Controltype': 'number', 'minvalue': 0, 'maxvalue': 999999, 'stepvalue': 1, 'width': '50px'},
      {'Controlname': 'Maxvalues', 'Controltype': 'number', 'minvalue': 0, 'maxvalue': 999999, 'stepvalue': 1, 'width': '50px'},
      {'Controlname': 'Stepvalue', 'Controltype': 'number', 'minvalue': 0, 'maxvalue': 999999, 'stepvalue': 1, 'width': '50px'},
      {
        'Controlname': 'Icon',
        'Controltype': 'select',
        'options': [],
        'width': '300px',
        'nzMode': 'default',
        'datasource': '/assets/icon.json'
      },
    ];
    this.refresh();
  }

  dosubmit(event) {
    if (this.havesubmitted) {
      this.message.info('have submitted.please waitting...');
      return;
    }
    if (event == 'save') {
      this.havesubmitted = true;
      this.ds.savecomponent(this.formdata, this.listdata).subscribe(data => {
        this.havesubmitted = false;
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    }
    if (event == 'delete') {
      this.havesubmitted = true;
      if (this.formdata.Componentlevel == '0') {
        this.message.info('root can not be deleted!');
        this.havesubmitted = false;
        return;
      }
      this.ds.deletecomponent(this.formdata).subscribe(data => {
        this.havesubmitted = false;
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    }
    if (event == 'create') {
      this.havesubmitted = true;
      if (this.formdata.Componentlevel != '1' && this.formdata.Componentlevel != '2') {
        this.message.info('only module and component can be created!');
        this.havesubmitted = false;
        return;
      }
      this.ds.createcomponent(this.formdata).subscribe(data => {
        this.havesubmitted = false;
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

  refresh() {
    this.ds.getcomponentjson().subscribe(data => {
      console.log(data);
      this.nodes = data;
    });
    this.ds.getcomponentsoptions().subscribe(data => {
      console.log(data);
      this.formcolnames[1].options = data;
    });
  }

  mouseAction(name: string, e: any): void {
    this.selectedkey = e.node.key;
    this.ds.getcomponentbyid(e.node.key).subscribe(data => {
      data.Component.Buttons = data.Component.Buttons.split(',');
      this.formdata = data.Component;
      this.listdata = data.Detail;
      this.designtitle = e.node.title + ' \u6388\u6743';

    });
  }

  listdatachange(event) {
    console.log(event);
    if (event.colname == 'Seq') {

      this.listdata.sort(
        (value1, value2) => {
          if (parseInt(value1.Seq) > parseInt(value2.Seq)) {
            return 1;
          }
          if (parseInt(value1.Seq) < parseInt(value2.Seq)) {
            return -1;
          }
          return 0;

        }
      );
    }
    if (event.colname == 'Controlname') {
      event.data.Controlname = this.ls.titlecase(event.data.Controlname);
    }
  }

  convertarray() {
    let newlistdata: any[] = [];
    let newlistdata2: any[] = [];
    newlistdata = this.listdata.slice(0);
    for (let i = 0; i < newlistdata.length; i++) {
      newlistdata2.push({'Controlname': newlistdata[i].Controlname, 'Controltype': newlistdata[i].Controltype});
    }
    return newlistdata2;
  }


}
