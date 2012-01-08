COMPILER	= ../tools/compiler.jar
DEST		= jquery.rocket.min.js
SOURCE		= jquery.rocket.js

all		: $(DEST)

$(DEST)		: $(COMPILER) $(SOURCE)
		java -jar $(COMPILER) --js $(SOURCE) --js_output_file $(DEST)

clean		:
		rm -f $(DEST)

