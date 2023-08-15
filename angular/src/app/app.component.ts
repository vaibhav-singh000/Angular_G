import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {
  }
  title = 'angular';
  EventName: any;
  EventDate: any;
  EventTime: any;
  Location: any;
  Audiences: any = [];
  EventImages: any;
  alldata: any = [];
  payload1: any;
  option: any = [];
  option1: any = [];
  option2: any = [];
  option3: any = []
  payload3: any;
  main_id: any;
  imagePath: any = [];
  searchEventByValue: any = "";
  searchEventTextType: string = 'text';
  searchBy: string = 'EventName';
  allAudience: any;
  searchString: string = '';
  ngOnInit() {
    this.showEvents();
  }

  async submit() {
    const payload = {
      EventName: this.EventName,
      EventDate: this.EventDate,
      EventTime: this.EventTime,
      Location: this.Location,
    }

    let response = await this.saveEventDetails(payload)
    this.main_id = Object(response)?._id;
    for (let i = 0; i < this.option.length; i++) {
      this.payload1 = {
        Event_id: this.main_id,
        Audiences: this.option[i]
      }
      this.add1();
    }

    this.payload3 = {
      Event_id: this.main_id,
      images: this.imgurl
    }
    this.add2();

  };

  saveEventDetails(payload: any) {
    return this.http.post('http://localhost:5000/data', payload).toPromise();
  }

  image() {
    // console.log("sas");
    for (let i = 0; i < this.alldata.length; i++) {
      this.imagePath = this.alldata[i].EventImages;
    }
  }
  add() {
    let i = this.option1.length + 1;
    this.option1.push(i);
  }
  addimage() {
    let i = this.option2.length + 1;
    this.option2.push(i);
  }
  imgurl = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  onSelect(event: any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imgurl = event.target.result;
        console.log(this.imgurl);

      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  add1() {
    this.http.post('http://localhost:5000/audience', this.payload1).subscribe(
      (response: any) => {
        console.log('POST request successful', response);
      },
      (error) => {
        console.error('Error making POST request', error);
      }
    );
  }
  add2() {
    this.http.post('http://localhost:5000/image', this.payload3).subscribe(
      (response: any) => {
        console.log('POST request successful', response);
      },
      (error) => {
        console.error('Error making POST request', error);
      }
    );
  }

  showEvents() {
    this.http.get('http://localhost:5000/details').subscribe(
      (response: any) => {
        console.log('POST request successful', response);
        this.alldata = response;
        console.log(this.alldata);
      },
      (error) => {
        console.error('Error making POST request', error);
      }
    );
  }


  searchEventBy() {
    this.searchString = '';
    this.allAudience = [];
    this.allimage = [];
    switch (this.searchEventByValue) {
      case 'date': {
        this.searchEventTextType = 'date';
        this.searchBy = 'EventDate';
        break;
      }
      case 'location': {
        this.searchEventTextType = 'text';
        this.searchBy = 'Location';
        break;
      }
      case 'audience': {
        this.searchEventTextType = 'text';
        this.searchBy = 'Audience';
        break;
      }
    }
  }

  Searchdata() {

    let data = this.searchString;
    switch (this.searchBy) {
      case 'EventDate':
      case 'Location': {
        this.http.get(`http://localhost:5000/search/${data}`).subscribe(
          (response: any) => {
            console.log('POST request successful', response);
            this.alldata = response;
            console.log(this.alldata);
          },
          (error) => {
            console.error('Error making POST request', error);
          }
        );
        break;
      }

      case 'Audience': {
        this.http.get(`http://localhost:5000/searchAudience/${data}`).subscribe(
          (response: any) => {
            console.log('POST request successful', response);
            this.alldata = response;
          },
          (error) => {
            console.error('Error making POST request', error);
          }
        );
        break;
      }
    }
  }


  viewAudiences(eventId: any) {
    this.http.get(`http://localhost:5000/getAudiencesByEvent/${eventId}`).subscribe(
      (response: any) => {
        this.allAudience = response;
      },
      (error) => {
        console.error('Error making POST request', error);
      }
    );
  }

  allimage: any;
  viewImages(eventId: any) {
    this.http.get('http://localhost:5000/image').subscribe(
      (response: any) => {
        this.allimage = response;
      },
      (error) => {
        console.error('Error making POST request', error);
      }
    );

  }
}
