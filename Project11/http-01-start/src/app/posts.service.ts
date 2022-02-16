import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Posts } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postsData: Posts = { title: title, content: content };
    return this.http
      .post<{ name: string }>(
        "https://backend-db-6f7ce-default-rtdb.firebaseio.com/posts.json",
        postsData,
        { observe: "response" }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");

    return this.http
      .get<{ [key: string]: Posts }>(
        "https://backend-db-6f7ce-default-rtdb.firebaseio.com/posts.json",
        {
          headers: new HttpHeaders({ "Custom-Header": "Hello" }),
          params: searchParams,
          responseType:'json'
        }
      )
      .pipe(
        map((responseData) => {
          const postsArray: Posts[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://backend-db-6f7ce-default-rtdb.firebaseio.com/posts.json",
        { observe: "events" , responseType:'text'}
      )
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
