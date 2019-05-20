
#include <emscripten/bind.h>

#include <algorithm-suite.h>
#include "algorithm.h"

#include <mode-suite.h>
#include "mode.h"


#define EXPORT_ALGORITHM_BLOCK(name) emscripten::class_<AlgorithmBlock<algorithm::name>>(#name) \
        .constructor() \
        .function("getName", &AlgorithmBlock<algorithm::name>::getName) \
        .function("getVersion", &AlgorithmBlock<algorithm::name>::getVersion) \
        .function("getKeySizes", &AlgorithmBlock<algorithm::name>::getKeySizes) \
        .function("setKey", &AlgorithmBlock<algorithm::name>::setKey) \
        .function("reset", &AlgorithmBlock<algorithm::name>::reset) \
        .function("encrypt", &AlgorithmBlock<algorithm::name>::encrypt) \
        .function("decrypt", &AlgorithmBlock<algorithm::name>::decrypt) \
        .function("setEndianCompat", &AlgorithmBlock<algorithm::name>::setEndianCompat) \
        .function("getBlockSize", &AlgorithmBlock<algorithm::name>::getBlockSize);
        
#define EXPORT_ALGORITHM_STREAM(name) emscripten::class_<AlgorithmStream<algorithm::name>>(#name) \
        .constructor() \
        .function("getName", &AlgorithmStream<algorithm::name>::getName) \
        .function("getVersion", &AlgorithmStream<algorithm::name>::getVersion) \
        .function("getKeySizes", &AlgorithmStream<algorithm::name>::getKeySizes) \
        .function("setKey", &AlgorithmStream<algorithm::name>::setKey) \
        .function("reset", &AlgorithmStream<algorithm::name>::reset) \
        .function("encrypt", &AlgorithmStream<algorithm::name>::encrypt) \
        .function("decrypt", &AlgorithmStream<algorithm::name>::decrypt) \
        .function("setEndianCompat", &AlgorithmStream<algorithm::name>::setEndianCompat) \
        .function("getIvSize", &AlgorithmStream<algorithm::name>::getIvSize) \
        .function("setIv", &AlgorithmStream<algorithm::name>::setIv);


#define EXPORT_MODE(name) emscripten::class_<Mode<mode::name::Cipher>>(#name"Cipher") \
        .constructor<AlgorithmBlock<algorithm::AlgorithmBlock>*, const emscripten::val&>() \
        .function("transform", &Mode<mode::name::Cipher>::transform) \
        .function("isPaddingRequired", &Mode<mode::name::Cipher>::isPaddingRequired) \
        .function("getBlockSize", &Mode<mode::name::Cipher>::getBlockSize); \
    emscripten::class_<Mode<mode::name::Decipher>>(#name"Decipher") \
        .constructor<AlgorithmBlock<algorithm::AlgorithmBlock>*, const emscripten::val&>() \
        .function("transform", &Mode<mode::name::Decipher>::transform) \
        .function("isPaddingRequired", &Mode<mode::name::Decipher>::isPaddingRequired) \
        .function("getBlockSize", &Mode<mode::name::Decipher>::getBlockSize);

using namespace cryptian;

EMSCRIPTEN_BINDINGS(cryptian) {
    
    EXPORT_ALGORITHM_BLOCK(Blowfish)
    EXPORT_ALGORITHM_BLOCK(Cast128)
    EXPORT_ALGORITHM_BLOCK(Cast256)
    EXPORT_ALGORITHM_BLOCK(Des)
    EXPORT_ALGORITHM_BLOCK(Threeway)
    EXPORT_ALGORITHM_BLOCK(Gost)
    EXPORT_ALGORITHM_BLOCK(Loki97)
    EXPORT_ALGORITHM_BLOCK(Rc2)
    EXPORT_ALGORITHM_BLOCK(Rijndael128)
    EXPORT_ALGORITHM_BLOCK(Rijndael192)
    EXPORT_ALGORITHM_BLOCK(Rijndael256)
    EXPORT_ALGORITHM_BLOCK(Safer)
    EXPORT_ALGORITHM_BLOCK(Saferplus)
    EXPORT_ALGORITHM_BLOCK(Tripledes)
    EXPORT_ALGORITHM_BLOCK(Xtea)
    EXPORT_ALGORITHM_BLOCK(Dummy)
    
    EXPORT_ALGORITHM_STREAM(Arcfour)
    EXPORT_ALGORITHM_STREAM(Enigma)
    EXPORT_ALGORITHM_STREAM(Wake)

    EXPORT_MODE(cbc)
    EXPORT_MODE(cfb)
    EXPORT_MODE(ctr)
    EXPORT_MODE(ecb)
    EXPORT_MODE(ncfb)
    EXPORT_MODE(nofb)
    EXPORT_MODE(ofb)

    emscripten::register_vector<std::size_t>("vector<std::size_t>");
    emscripten::register_vector<char>("vector<char>");
    
}

