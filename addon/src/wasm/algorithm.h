
#ifndef CRYPTIAN_ADDON_WASM_ALGORITM_H_
#define CRYPTIAN_ADDON_WASM_ALGORITM_H_

#include <string>
#include <vector>
#include <emscripten/val.h>


namespace cryptian {
    
template <typename T>
class AlgorithmBlock {
public:
    T* algorithm;

    AlgorithmBlock() {
        algorithm = new T();
    }
    
    ~AlgorithmBlock() {
        delete algorithm;
    }
    
    std::string getName() {
        return algorithm->getName();
    }

    std::size_t getVersion() {
        return algorithm->getVersion();
    }
    
    emscripten::val getKeySizes() {
        auto vec = algorithm->getKeySizes();
        emscripten::val new_array = emscripten::val::array();
        
        for(auto it = vec.begin(); it != vec.end(); it++)
            new_array.call<void>("push", *it);
        
        return new_array;
    }

    void setKey(const emscripten::val& value) {
        algorithm->setKey(emscripten::vecFromJSArray<char>(value));
    }
    
    void reset() {
        algorithm->reset();
    }
    
    std::vector<char> encrypt(const emscripten::val& value) {
        return algorithm->encrypt(emscripten::vecFromJSArray<char>(value));
    }
    
    std::vector<char> decrypt(const emscripten::val& value) {
        return algorithm->decrypt(emscripten::vecFromJSArray<char>(value));
    }
    
    void setEndianCompat(bool value) {
        algorithm->setEndianCompat(value);
    }
    
    std::size_t getBlockSize() {
        return algorithm->getBlockSize();
    }
};

template <typename T>
class AlgorithmStream {
protected:
    T* algorithm;

public:
    AlgorithmStream() {
        algorithm = new T();
    }

    ~AlgorithmStream() {
        delete algorithm;
    }
    
    std::string getName() {
        return algorithm->getName();
    }

    std::size_t getVersion() {
        return algorithm->getVersion();
    }
    
    emscripten::val getKeySizes() {
        auto vec = algorithm->getKeySizes();
        emscripten::val new_array = emscripten::val::array();
        
        for(auto it = vec.begin(); it != vec.end(); it++)
            new_array.call<void>("push", *it);
        
        return new_array;
    }

    void setKey(const emscripten::val& value) {
        algorithm->setKey(emscripten::vecFromJSArray<char>(value));
    }
    
    void reset() {
        algorithm->reset();
    }
    
    std::vector<char> encrypt(const emscripten::val& value) {
        return algorithm->encrypt(emscripten::vecFromJSArray<char>(value));
    }
    
    std::vector<char> decrypt(const emscripten::val& value) {
        return algorithm->decrypt(emscripten::vecFromJSArray<char>(value));
    }
    
    void setEndianCompat(bool value) {
        algorithm->setEndianCompat(value);
    }
    
    void setIv(const emscripten::val& value) {
        algorithm->setIv(emscripten::vecFromJSArray<char>(value));
    }
    
    std::size_t getIvSize() {
        return algorithm->getIvSize();
    }
};

};


#endif
