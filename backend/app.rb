require 'sinatra'
require 'sinatra/activerecord'
require 'require_all'

set :database, {adapter: "sqlite3", database: "mydb.sqlite3"}

require_all 'models'

post '/todos' do
  Todo.create(params[:todo])
end get

'/todos' do
  Todo.all.to_json
end

put '/todos/:id' do
  Todo.find(params[:id]).update(params[:todo])
end

delete '/todos/:id' do
  Todo.find(params[:id]).delete
 end
