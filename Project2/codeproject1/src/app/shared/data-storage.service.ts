import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map,take,tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/services/recipes.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http:HttpClient,private recipeService:RecipeService,private authService:AuthService) {

  }

  storeRecipes() {
    const recipes = this.recipeService.geRecipes();
    this.http.put('https://ng-course-recipe-book-ba5dc-default-rtdb.firebaseio.com/recipes.json',recipes).subscribe(resp=> {
        console.log(resp);
    })
  }

  fetchRecipes() {
    // this.authService.user.pipe(take(1),exhaustMap(user=> {})).subscribe(user=> {
      
    // })
     return this.http.get<Recipe[]>("https://ng-course-recipe-book-ba5dc-default-rtdb.firebaseio.com/recipes.json")
      .pipe(map(recipeData=> {
          return recipeData.map(x=>{
              if(!x['ingredients']){
                  return <Recipe>{...x,ingredients:[]};
              }
              else {
                return x;
              }
          })
      }),tap(data=> {
        this.recipeService.updateRecipesArray(data);
      }));
    //   .subscribe(recipesData=>{
    //     this.recipeService.updateRecipesArray(recipesData);
    //   })
  }
}
