import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

import {RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';


@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, CommonModule,
    RouterModule, NgZorroAntdModule, HttpModule, HttpClientModule, TranslateModule
  ],
  declarations: [],
  exports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, CommonModule,
    RouterModule, NgZorroAntdModule, HttpModule, HttpClientModule, TranslateModule
  ]
})
export class SklCommonModule {
}
