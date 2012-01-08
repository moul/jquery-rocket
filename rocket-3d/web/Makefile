COMPILER	= ../../tools/compiler.jar
DEST		= jquery.rocket-3d.min.js
SOURCE		= jquery.rocket-3d.js

all		: $(DEST)

$(DEST)		: $(COMPILER) $(SOURCE)
		java -jar $(COMPILER) --js $(SOURCE) --js_output_file $(DEST)

clean		:
		rm -f $(DEST)

