import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from '@model/hero';
import { MessageService } from '@svc/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = '/api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  // 使用MessageService记录HeroService消息
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * 处理失败的Http操作，让应用继续。
   * @param operation - 失败的操作的名称
   * @param result - 作为可观察结果返回的可选值
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: 将错误发送到远程日志记录基础结构
      console.error(error);

      // TODO: 更好地转换错误以供用户使用
      this.log(`${operation} failed: ${error.message}`);

      // 通过返回空结果让应用程序继续运行。
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  // GET 通过id获取英雄。如果找不到时显示404
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`获取英雄 id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // GET 通过id获取英雄。如果找不到时返回`undefined`
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}?id=${id}`;
    return this.http.get<Hero[]>(url).pipe(
      map((heroes) => heroes[0]), // returns a {0|1} element array
      tap((h) => {
        const outcome = h ? `获取` : `未找到`;
        this.log(`${outcome}英雄 id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // PUT 更新服务器上的英雄
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`更新英雄 id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  // POST 新增服务器上的英雄
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`添加英雄 id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  // POST 删除服务器上的英雄
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`删除英雄 id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  // GET 搜获包含关键词的英雄
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // 如果搜索不到关键词，返回空数组
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`找到匹配的英雄 "${term}"`)
          : this.log(`没有英雄匹配 "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
