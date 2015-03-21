require 'sinatra'
require_relative './util.rb'

get '/whois/:name' do |name|
  valid_domain(name) and "Found" or "Not found"
end
