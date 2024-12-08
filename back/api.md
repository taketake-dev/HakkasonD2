# lgion
/login
##
- method:POST
- pass:/
- body={id:str,pass:str}
- res={success:bool}
##
- method:POST
- pass:/signup
- body={id:str,pass:str,name:str|null}
- res={success:bool}
## not
- method:POST
- pass:/email
- 
- 
# production
/production
##
- method:GET
- pass:/:id
- body={}
- res={url:str,creator:str,type:int}
##
- method:GET
- pass:/creator/:id
- body={}
- res={ids:[int]}
## FormData
- method:POST
- pass:/
- body={file:filedata,type:int,creator:str}
- res={id:str}
## 
- method:DELL
- pass:/:id
- body={}
- res={success:bool}
##
- method:GET
- pass:/type
- body={}
- res={success:bool}
- res={list[{id:int,role:str}]}

APIを３つ
いしゅーのやつ書く
