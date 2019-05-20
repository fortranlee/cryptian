
CC = emcc
CFLAGS = -O2 -Wall -std=c++11
LDFLAGS = --bind -s WASM=1

LIB = ../../lib

DEPS = $(wildcard $(LIB)/*.h) $(wildcard $(LIB)/algorithm/*.h) $(wildcard $(LIB)/mode/*.h)

SRC = $(wildcard $(LIB)/algorithm/*.cc) $(wildcard $(LIB)/mode/*.cc)

OBJ = $(patsubst %.cc, %.o, $(SRC))

$(LIB)/algorithm/%.o: $(LIB)/algorithm/%.cc $(DEPS)
	$(CC) $(CFLAGS) $< -o $@ -I$(LIB)

$(LIB)/mode/%.o: $(LIB)/mode/%.cc $(DEPS)
	$(CC) $(CFLAGS) $< -o $@ -I$(LIB)

cryptian.o: cryptian.cc $(DEPS)
	$(CC) $(CFLAGS) $< -o $@ -I$(LIB)

cryptian.js: $(OBJ) cryptian.o
	$(CC) $(LDFLAGS) $(CFLAGS) $^ -o $@

clean:
	rm -f $(OBJ) cryptian.o cryptian.wasm


