import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { _contacts } from './contact_files';

export interface _contactElement {
  "E_mail_Address": string,
      "Related_name": string,
      "Home_Address_2": string,
      "Anniversary": string,
      "First_Name": string,
      "Business_Address_2": string,
      "Department": string,
      "Display_Name": string,
      "Home_State": string,
      "Business_Country": string,
      "Home_Street": string,
      "Birthday": string,
      "Home_Country": string,
      "Pager": string,
      "Categories": string,
      "Home_City": string,
      "E_mail_3_Address": string,
      "Home_Fax": string,
      "Gender": string,
      "Notes": string,
      "Country_Code": string,
      "Job_Title": string,
      "Business_Address": string,
      "Web_Page_2": string,
      "Mobile_Phone": string,
      "Organization": string,
      "Home_Phone": string,
      "E-mail_2_Address": string,
      "Last_Name": string,
      "Nickname": string,
      "Business_Fax": string,
      "Home Postal Code": string,
      "Business Phone": string,
      "Business Postal Code": string,
      "Web Page": string,
      "Business City": string,
      "Business State": string
}

const ELEMENT_DATA: _contactElement[] = _contacts;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: any = [];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [
    "Name", "E-Mail", "Phone No."
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() {
    this.contact = _contacts;
  }

  ngOnInit(): void {
  }

}
