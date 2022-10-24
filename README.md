## Site Info
Url : http://kdong-nestcats.kro.kr/docs
ID : kdong1224
password : 1224


# NestJS Install

npm i -g @nestjs/cli
nest new "프로젝트 이름"

# NestJS 순서

> serviece에 return 값을 controller가 받고 module로 보내지고 NestFactory에 들어가서 자동으로 처리해준다.

# @ -> 데코레이터 패턴

> 함수나 클래스에 기능을 첨가해준다.
> 기능을 첨가해서 재사용성을 좋게 해준다.
> 반드시 붙여 사용해야 한다.

```
⭕️
@Get()
getHello(): string {
  return this.appService.getHello();
}

❌
@Get()


getHello(): string {
  return this.appService.getHello();
}
```

# 의존성 주입

service는 공급자로 취급이 가능하다?
Injectable -> provider 란 뜻으로 이해?
즉, providers에 들어가 있어야 사용이 가능하다.(사업자 등록?)

# Summary

> 일반적으로 요청 수명 주기는 다음과 같습니다.

Incoming request <br />
Globally bound middleware <br />
Module bound middleware <br />
Global guards <br />
Controller guards <br />
Route guards <br />
Global interceptors (pre-controller) <br />
Controller interceptors (pre-controller) <br />
Route interceptors (pre-controller) <br />
Global pipes <br />
Controller pipes <br />
Route pipes <br />
Route parameter pipes <br />
Controller (method handler) <br />
Service (if exists) <br />
Route interceptor (post-request) <br />
Controller interceptor (post-request) <br />
Global interceptor (post-request) <br />
Exception filters (route, then controller, then global) <br />
Server response <br />
