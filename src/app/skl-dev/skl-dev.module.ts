import {SklCoreModule} from '../skl-core/skl-core.module';
import {SklCommonModule} from '../common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {CreateComponentComponent} from './create-component/create-component.component';
import {Routes} from '@angular/router';


@NgModule({
  imports: [
    SklCommonModule, SklCoreModule
  ],
  declarations: [CreateComponentComponent]
})
export class SklDevModule {
}
