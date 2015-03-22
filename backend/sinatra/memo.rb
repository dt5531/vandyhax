require 'sequel'
require 'json'
require 'logger'

MAX_ITEMS = 10_000

DB = Sequel.connect 'sqlite://cache.db'

DB.create_table? :cache do
  primary_key :id
  String :keyword
  TrueClass :unfiltered
  String :results
  DateTime :last_searched
  index [:keyword, :unfiltered], :unique => true
end

def keyword_get(key, unfiltered)
  # grab result
  res = DB[:cache].where(:keyword => key, :unfiltered => unfiltered).first
  return nil if res.nil?

  # update last searched info
  DB[:cache].where(:id => res[:id]).update(:last_searched => DateTime.now)

  # deserialize result
  JSON.load res[:results]
end

def keyword_put(key, results, unfiltered)
  if DB[:cache].count + 1 > MAX_ITEMS
    oldest = DB[:cache].order(:last_searched).first
    DB[:cache].where(:id => oldest[:id]).delete
  end

  DB[:cache].insert(:keyword => key,
                    :results => JSON.dump(results),
                    :unfiltered => unfiltered,
                    :last_searched => DateTime.now)
end
