require 'sinatra'
require 'sinatra/activerecord'
require 'require_all'

set :database, {adapter: "sqlite3", database: "mydb.sqlite3"}

require_all 'models'

post '/todos' do
  Todo.create(params[:todo])
end

get '/todos' do
  Todo.all.to_json
end

put '/todos/:id' do
  Todo.find(params[:id]).update(params[:todo])
end

delete '/todos/:id' do
  Todo.find(params[:id]).destroy
end

configure do
  enable :cross_origin
end

before do
  response.headers['Access-Control-Allow-Origin'] = '*'
end

options "*" do
  response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
  response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
  response.headers["Access-Control-Allow-Origin"] = "*"
  200
end
