# vandyhax
We built DankNames for one reason: for the lulz.

More specifically, many people have their own personal "vanity" domains that feature innovative wordplay. These names are more than just eye catching, and some of them are downright hilarious. We built a website that would generate cool domain names and allow the user to easily buy the available ones.

# [dankna.me](dankna.me)

The domain generation process looks something like this: 1) Fetch names from an online pun generator 2) Rank puns based on the 'uniqueness' (frequency in a representative English text vs. reddit's r/jokes) using NLTK of the words they use. 3) Convert top-ranking puns into a domain-able format 4) Display available domain names (with links to buy them) to the end user.
