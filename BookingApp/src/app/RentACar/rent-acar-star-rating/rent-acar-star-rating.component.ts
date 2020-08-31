import { Component, OnInit, Input } from '@angular/core';
import { EnterpriseService } from '../Services/EnterpriseService/enterprise.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/Shared/Model/RentACars/Models/Car.model';
import { RatingParameters } from 'src/app/Shared/Model/RentACars/Models/Parameters/RatingParameters.model';

@Component({
  selector: 'app-rent-acar-star-rating',
  templateUrl: './rent-acar-star-rating.component.html',
  styleUrls: ['./rent-acar-star-rating.component.css']
})
//morace da se doradi, posto ce ici po rezervaciji korisnika tj input mora biti rezervacija korisnika
//za proveru da li moze da rejtuje, proveriti da li je danasnji datum veci od datuma do kada je rezervacija i da li je isRated u okviru te rezervacije na false
export class RentACarStarRatingComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  selectedValue2: number;
  return;
  name: string;
  brand: string;
  model: string;
  Enterprise;
  @Input()
  item: Car
  constructor(private routeService: Router, private enterpriseService: EnterpriseService, private toaster: ToastrService, public activeModal : NgbActiveModal) { }

  ngOnInit(): void {
    this.enterpriseService.getOneEnterprise(this.item.enterpriseId).subscribe(i => {
      this.Enterprise = i;
      console.log(this.Enterprise.rating);
      console.log(this.item.ratings);
      this.name = this.Enterprise.name;
      this.model = this.item.model;
      this.brand = this.item.brand;
      
    })
  }

  countStar(star) {
    this.selectedValue = star;
  
  }
  countStar2(star){
    this.selectedValue2 = star;
  }

  
  confirmRate(){
    
    var ratingParam = new RatingParameters();
    ratingParam.enterpriseId = this.item.enterpriseId;
    ratingParam.carId = this.item.id;
    ratingParam.enterpriseRating = this.selectedValue;
    ratingParam.carRating = this.selectedValue2;

    this.enterpriseService.setRating(ratingParam).subscribe( i=>{
      this.return = i;
      this.toaster.success("Rate operation has been successfully executed.",'Rating',{
        timeOut : 2000
      })
    })
    this.activeModal.close();
  }
}
