import { Recommendation } from './../../models/recommendation';
import { PreferencesService } from './../../service/preferences.service';
import { UserPreference } from './../../models/UserPreference';
import { TeamFootball } from './../../models/TeamFootball';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TeamSelected } from 'src/app/models/TeamSelected';
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
    {name: 'Alianza Lima'},
    { name: 'Universitario de Deportes'},
    {name: 'Sporting Cristal'},
    {name: 'Melgar'},
    { name: 'Cesar Vallejo'},
    { name: 'Sport Huancayo'},
    { name: 'Cienciano'},
    { name: 'River Plate'},
    {name: 'Boca Juniors'},
    {name: 'Racing'},
    { name: 'Independiente'},
    { name: 'Estudiantes de la Plata'},
    { name: 'Colon de Santa fe'},
    { name: 'Talleres de Cordoba'},
    { name: 'Flamengo'},
    { name: 'Flamengo'},
    {name: 'Palmeiras'},
     {name: 'Atletico Mineiro'},
    { name: 'Atletico Paranaense'},
    { name: 'Internacional'},
    { name: 'Santos'},
    { name: 'Sao Paulo'},
    { name: 'Corinthians'},
    { name: 'Independiente del Valle'},
     {name: 'LDU Quito'},
    { name: 'Barcelona SC'},
    { name: 'Emelec'},
    { name: 'Olimpia'},
    { name: 'Libertad'},
    { name: 'Guarani'},
    { name: 'Nacional'},
    { name: 'Peñarol'},
    { name: 'Real Madrid'},
    { name: 'FC Barcelona'},
    { name: 'Atletico de Madrid'},
    { name: 'Napoli'},
    { name: 'Liverpool FC'},
    { name: 'Ajax'},
    { name: 'Porto'},
    { name: 'Club Brujas'},
    { name: 'Bayern Leverkusen'},
    { name: 'Bayern Munich'},
    { name: 'Inter de Milan'},
    {name: 'Tottenham Hotspur'},
    {name: 'Eintracht Frankfurt'},
    { name: 'Sporting Lisboa'},
    { name: 'Marsella'},
    {name: 'Chelsea'},
    { name: 'AC Milan'},
    { name: 'RB Salzburg'},
    { name: 'Dinamo Zagreb'},
    { name: 'RB Leipzig'},
    { name: 'Shakhtar Donetsk'},
    { name: 'Celtic FC'},
    { name: 'Manchester City'},
    { name: 'Borussia Dortmund'},
    { name: 'Sevilla'},
    { name: 'Kobenhavn'},
    { name: 'Paris Saint-Germain'},
    { name: 'Benfica'},
    { name: 'Juventus'},
    { name: 'Maccabi Haifa'},
    { name: 'Manchester United'},
    
   
  ];
  UserPreference!:UserPreference
  UserPreference2!:UserPreference
  user_preferences:UserPreference[]=[]

  public loginform!:FormGroup;
  Recommendation!:Recommendation
  
  constructor(private formBuilder:FormBuilder,private PreferencesService:PreferencesService) {

    this.UserPreference = {} as UserPreference
    this.UserPreference2 = {} as UserPreference
    this.Recommendation = {} as Recommendation
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    
   }
   
  ngOnInit() {
    this.loginform=this.formBuilder.group({
      team:['',Validators.required],
      rating:['',Validators.required]



     })
     this.Get_preferences();
     
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
    if(this.rating==undefined){
      this.rating=0
    }
    this.UserPreference.rating=this.rating
    console.log(this.dataSource.data)
    console.log("añadir")
    console.log(this.UserPreference)

    this.addElement(this.UserPreference)
  
  }
  addElement(user:UserPreference){
   
    this.PreferencesService.post_user_preference(user).subscribe((response:any)=>{
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      this.teams= this.teams.filter((team:TeamFootball)=>{
        return team.name !== user.name ? team : false;
       })


    })
  }
  Delete(team_name: string, user_id: number){
      this.PreferencesService.delete_user_preference_by_team_name(team_name,user_id).subscribe((response:any)=>{

        this.dataSource.data = this.dataSource.data.filter((o: UserPreference) => {
          return o.name !== team_name ? o : false;
        });
        this.teams.push({name:team_name})
        this.teams = this.teams.map((o: any) => { return o; });

      })
  }
  getAll(){
           this.PreferencesService.get_recommendations().subscribe((response:any)=>{

            this.dataSource.data = response;

           })

  }
  Addrecommendation(){

       this.PreferencesService.create_recommendation_by_user_preferences(1).subscribe((response:any)=>{
         this.Recommendation=response
         console.log(this.Recommendation)
        //this.dataSource2.data.push(...response);
        //this.dataSource2.data = this.dataSource.data.map((o: any) => { return o; });



       }) 






  }
  Get_preferences(){
      this.PreferencesService.get_user_preferences().subscribe((response:any)=>{
        this.dataSource.data = response;
        for(let item of response){
          this.teams= this.teams.filter((team:TeamFootball)=>{
           return team.name !== item.name ? team : false;
          })
}
                 console.log(this.teams)
               
      })


  }









}
