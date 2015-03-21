#!/usr/bin/env ruby

require "open-uri"

output = ARGV.first || "tlds.txt"

open "http://data.iana.org/TLD/tlds-alpha-by-domain.txt" do |f|
  open output, "w+" do |o|
    o.write f.readlines.map(&:strip).drop(1).map(&:downcase).reject {|i| i.match /^xn--/}.inspect
  end
end


