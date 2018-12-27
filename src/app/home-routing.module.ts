import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import {ModualComponent} from './master/modual/modual.component';
import {RoleComponent} from './role/role/role.component';
import {OrgComponent} from './org/org/org.component';
import {UserComponent} from './user/user/user.component';
import {UsermanageComponent} from './user/usermanage/usermanage.component';
import {UsergroupComponent} from './user/usergroup/usergroup.component';
import {PasswordchangeComponent} from './user/passwordchange/passwordchange.component';
import {PasswordresetComponent} from './user/passwordreset/passwordreset.component';
import {UserinfoComponent} from './user/userinfo/userinfo.component';
import {LangComponent} from './master/lang/lang.component';
import {CreateComponentComponent} from './skl-dev/create-component/create-component.component';
import {EnumComponent} from './master/enum/enum.component';
import {HomeComponent} from './home/home/home.component';


const adminRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: 'modual', component: ModualComponent},
          {path: 'role', component: RoleComponent},
          {path: 'org', component: OrgComponent},
          {path: 'user', component: UserComponent},
          {path: 'usermanage', component: UsermanageComponent},
          {path: 'usergroup', component: UsergroupComponent},
          {path: 'passwordchange', component: PasswordchangeComponent},
          {path: 'passwordreset', component: PasswordresetComponent},
          {path: 'userinfo', component: UserinfoComponent},
          {path: 'create-component', component: CreateComponentComponent},
          {path: 'enum', component: EnumComponent},
          {path: 'lang', component: LangComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
