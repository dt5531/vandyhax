require 'sinatra'
require 'sinatra/json'
require_relative './util.rb'

get '/whois/:name' do |name|
  res = valid_domain(name) and "Found" or "Not found"
  json :result => res
end

get '/puns/:phrase' do |phrase|
  res = pungen(phrase)
  json :result => res
end

get '/puns/:phrase/unsafe' do |phrase|
  res = pungen(phrase, "1")
  json :result => res
end

get '/domains/:dom' do |dom|
  dom.gsub!(/\W/, '')
  domains = match_phrase(dom)
  json :result => domains
end

