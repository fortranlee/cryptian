

#ifndef CRYPTIAN_ADDON_WASM_MODE_H_
#define CRYPTIAN_ADDON_WASM_MODE_H_

#include <vector>

#include <emscripten/val.h>
#include <algorithm-block.h>
#include "algorithm.h"

namespace cryptian {

template <typename T>
class Mode {
protected:
    T mode;
public:
    Mode(AlgorithmBlock<algorithm::AlgorithmBlock>* algorithm, const emscripten::val& iv): mode() {
        mode.setAlgorithm(algorithm->algorithm);
        mode.setIv(emscripten::vecFromJSArray<char>(iv));
    }
    
    std::vector<char> transform(const emscripten::val& value) {
        return mode.transform(emscripten::vecFromJSArray<char>(value));
    }
    
    bool isPaddingRequired() {
        return mode.isPaddingRequired();
    }
    
    std::size_t getBlockSize() {
        return mode.getBlockSize();
    }
};

};

#endif
