import { PreferencesService } from './../../service/preferences.service';
import { UserPreference } from './../../models/UserPreference';
import { TeamFootball } from './../../models/TeamFootball';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {
  val!: number
  value!:number;
  dataSource !:MatTableDataSource<any>;
  dataSource2 !:MatTableDataSource<any>;

  name!:string
  rating!:number

  teams: TeamFootball[] = [
    {teamId: 1, name: 'Alianza Lima'},
    {teamId: 2, name: 'Universitario de Deportes'},
    {teamId: 3, name: 'Sporting Cristal'},
    {teamId: 4, name: 'Melgar'},
    {teamId: 5, name: 'Cesar Vallejo'},
    {teamId: 6, name: 'Sport Huancayo'},
    {teamId: 7, name: 'Cienciano'},
    {teamId: 8, name: 'River Plate'},
    {teamId: 9, name: 'Boca Juniors'},
    {teamId: 10, name: 'Racing'},
    {teamId: 11, name: 'Independiente'},
    {teamId: 12, name: 'Estudiantes de la Plata'},
    {teamId: 13, name: 'Colon de Santa fe'},
    {teamId: 14, name: 'Talleres de Cordoba'},
    {teamId: 14, name: 'Flamengo'},
    {teamId: 15, name: 'Flamengo'},
    {teamId: 16, name: 'Palmeiras'},
    {teamId: 17, name: 'Atletico Mineiro'},
    {teamId: 18, name: 'Atletico Paranaense'},
    {teamId: 19, name: 'Internacional'},
    {teamId: 20, name: 'Santos'},
    {teamId: 21, name: 'Sao Paulo'},
    {teamId: 22, name: 'Corinthians'},
    {teamId: 23, name: 'Independiente del Valle'},
    {teamId: 24, name: 'LDU Quito'},
    {teamId: 25, name: 'Barcelona SC'},
    {teamId: 26, name: 'Emelec'},
    {teamId: 27, name: 'Olimpia'},
    {teamId: 28, name: 'Libertad'},
    {teamId: 29, name: 'Guarani'},
    {teamId: 30, name: 'Nacional'},
    {teamId: 31, name: 'Peñarol'},
    {teamId: 32, name: 'Real Madrid'},
    {teamId: 33, name: 'FC Barcelona'},
    {teamId: 34, name: 'Atletico de Madrid'},
    {teamId: 35, name: 'Napoli'},
    {teamId: 36, name: 'Liverpool FC'},
    {teamId: 37, name: 'Ajax'},
    {teamId: 38, name: 'Porto'},
    {teamId: 39, name: 'Club Brujas'},
    {teamId: 40, name: 'Bayern Leverkusen'},
    {teamId: 41, name: 'Bayern Munich'},
    {teamId: 42, name: 'Inter de Milan'},
    {teamId: 43, name: 'Tottenham Hotspur'},
    {teamId: 44, name: 'Eintracht Frankfurt'},
    {teamId: 45, name: 'Sporting Lisboa'},
    {teamId: 46, name: 'Marsella'},
    {teamId: 47, name: 'Chelsea'},
    {teamId: 48, name: 'AC Milan'},
    {teamId: 49, name: 'RB Salzburg'},
    {teamId: 50, name: 'Dinamo Zagreb'},
    {teamId: 51, name: 'RB Leipzig'},
    {teamId: 52, name: 'Shakhtar Donetsk'},
    {teamId: 53, name: 'Celtic FC'},
    {teamId: 54, name: 'Manchester City'},
    {teamId: 55, name: 'Borussia Dortmund'},
    {teamId: 56, name: 'Sevilla'},
    {teamId: 57, name: 'Kobenhavn'},
    {teamId: 58, name: 'Paris Saint-Germain'},
    {teamId: 59, name: 'Benfica'},
    {teamId: 60, name: 'Juventus'},
    {teamId: 61, name: 'Maccabi Haifa'},
    {teamId: 62, name: 'Manchester United'},
    
   
  ];
  UserPreference!:UserPreference
  UserPreference2!:UserPreference
  user_preferences:UserPreference[]=[]

  public loginform!:FormGroup;
  
  constructor(private formBuilder:FormBuilder,private PreferencesService:PreferencesService) {

    this.UserPreference = {} as UserPreference
    this.UserPreference2 = {} as UserPreference
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    
   }
   
  ngOnInit() {
    this.loginform=this.formBuilder.group({
      team:['',Validators.required],
      rating:['',Validators.required]



     })
     
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    this.val = value;
    return value;
  }
  new_rate( aId: number){
   
    this.rating=aId
    
  }
  Submit(){
    this.UserPreference.userId=1
    this.UserPreference.name=this.name
    this.UserPreference.rating=this.rating
    console.log(this.dataSource.data)
    console.log("añadir")
    this.addElement(this.UserPreference)
   
  
  }
  addElement(user:UserPreference){
   
    this.PreferencesService.post_user_preference(user).subscribe((response:any)=>{
      this.dataSource.data.push(...response);
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    })
  }
  Delete(team_name: string, user_id: number){
      this.PreferencesService.delete_user_preference_by_team_name(team_name,user_id).subscribe((response:any)=>{

        this.dataSource.data = this.dataSource.data.filter((o: UserPreference) => {
          return o.name !== team_name ? o : false;
        });

      })
  }
  getAll(){
           this.PreferencesService.get_recommendations().subscribe((response:any)=>{

            this.dataSource.data = response;

           })

  }
  Addrecommendation(){

       this.PreferencesService.create_recommendation_by_user_preferences(1).subscribe((response:any)=>{

        this.dataSource2.data.push(...response);
        this.dataSource2.data = this.dataSource.data.map((o: any) => { return o; });



       })






  }









}
