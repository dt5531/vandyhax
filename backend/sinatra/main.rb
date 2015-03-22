require 'sinatra'
require 'sinatra/json'
require_relative './util.rb'
require_relative './memo.rb'

def get_pun(phrase, unfiltered=false)
  puns = keyword_get phrase, unfiltered
  unless puns
    if unfiltered
      puns = pungen phrase, "1"
    else
      puns = pungen phrase
    end
    keyword_put phrase, puns, unfiltered
  end
  puns
end

before do
  headers 'Access-Control-Allow-Origin' => '*',
    'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
end

get '/whois/:name' do |name|
  res = valid_domain(name) and "Found" or "Not found"
  json :result => res
end

get '/puns/:phrase' do |phrase|
  res = get_pun phrase
  json :result => res
end

get '/puns/:phrase/unsafe' do |phrase|
  res = get_pun phrase, true
  json :result => res
end

get '/domains/:dom' do |dom|
  dom.gsub!(/\W/, '')
  domains = find_unused(dom)
  json :result => domains
end

