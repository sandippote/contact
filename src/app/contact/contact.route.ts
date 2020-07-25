import { Routes } from '@angular/router'
import { ContactComponent } from './contact.component'

export const contactRoute: Routes = [
    {
        path: '**',
        redirectTo: 'contact'
    },
    {
        path: 'contact',
        component: ContactComponent 
    }
]