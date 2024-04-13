import axios from "axios";
import { definePlugin } from "vue-request";

export default definePlugin(() => {
  const _beforeUpload = (
    file,
    accept,
    name,
    api,
    path,
    multi,
    progressList,
    datePrefix,
  ) => {
    if (!path) path = '';
    if (
      accept + '' == '' ||
      accept.replace(/\./g, 'image/').indexOf(file.type) >= 0
    ) {
      setTimeout(() => {
        if (!formState[name + '_filelist']) formState[name + '_filelist'] = [];
        if (!multi) {
          var x = {
            uid: file.uid,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate,
            name: file.name,
            size: file.size,
            type: file.type,
            webkitRelativePath: file.webkitRelativePath,
            status: 'done',
            api: api,
          };
          formState[name + '_filelist'] = [x];
        } else {
          formState[name + '_filelist'].forEach((x) => {
            if (x.uid == file.uid) {
              x.status = 'done';
              x.api = api;
            }
          });
        }
      }, 10);

      return false;
    } else {
      $showToast(`${file.name} không được chấp nhận`, 'error');
      return false;
    }
  };

  const _parseFileAndUpload = async (
    file,
    fnSuccess,
    name,
    api,
    path,
    progressList,
    datePrefix,
    folderName,
  ) => {

    _readAndUploadContinue(
      file,
      fnSuccess,
      name,
      api,
      path,
      progressList,
      datePrefix,
      folderName,
    );
  };
  
  const _readAndUploadContinue = (
    file,
    totalChunks,
    currentChunk,
    chunkSize,
    fnSuccess,
    name,
    api,
    path,
    progressList,
    datePrefix,
    folderName,
  ) => {

    if (!file || !file.slice) return;
    var offset = currentChunk * chunkSize;
    var currentFilePart = file.slice(offset, offset + chunkSize);

    var reader = new FileReader();
    reader.filename = file.name;
    reader.fileno = 0;
    (reader.folder = (
      path +
      '/' +
      (datePrefix == true
        ? _formatDate(Date.now()).split(' ')[0].replace(/\//g, '-')
        : '')
    )
      .replace(/\/\//g, '/')
      .replace(/\/\//g, '/')
      .replace(/\/\//g, '/')),
      (reader.size = file.size);
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function (evt) {
      if (evt.target.readyState == FileReader.DONE) {
        // DONE == 2
        if (evt.target.result && evt.target.result.length > 0) {
          //that.setState({numChunkProcess: that.state.numChunkProcess + 1});
          const data = {
            folderName: folderName,
            urlPath: (
              path +
              '/' +
              (datePrefix == true
                ? _formatDate(Date.now()).split(' ')[0].replace(/\//g, '-')
                : '')
            )
              .replace(/\/\//g, '/')
              .replace(/\/\//g, '/')
              .replace(/\/\//g, '/'),
            contentBase64: btoa(evt.target.result),
            fileName: evt.target.filename,
            contentType: 'contentType',
            noDate: true,
            fileSize: evt.target.size,
            trunkSize: chunkSize,
            trunkNum: evt.target.trunkno,
          };
          axios.post(`https://localhost:7176/api/${api}`,{
            loading: false,
            body: data,
          })
          .then((res) => {
            axios
            var percent = parseInt((currentChunk * 100) / totalChunks);
            if (percent == 0) percent = 1;
            if (!progressList.value) progressList.value = [];
            if (
              !progressList.value.find(
                (x) => x.name == name && x.fileName == evt.target.filename,
              )
            )
              progressList.value.push({
                name: name,
                Percent: 0,
                fileName: evt.target.filename,
                size: parseInt(evt.target.size / 1024 / 1024),
              });
            if (
              progressList.value.find(
                (x) => x.name == name && x.fileName == evt.target.filename,
              )
            )
              progressList.value.find(
                (x) => x.name == name && x.fileName == evt.target.filename,
              ).Percent = percent + 1;

            if (evt.target.trunkno + 1 < totalChunks) {
              _readAndUploadContinue(
                file,
                totalChunks,
                evt.target.trunkno + 1,
                chunkSize,
                fnSuccess,
                name,
                api,
                path,
                progressList,
                datePrefix,
                folderName,
              );
            } else {
              if (fnSuccess) fnSuccess(res);
            }
          });
        }
      }
    };
    reader.readAsBinaryString(currentFilePart);
  };
  
  return {
    provide: {
      uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
          (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
          ).toString(16)
        );
      },
      
      validURL(str) {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str);
      },

      formatDate: (date, format) => {
        if (date) {
          const momentDate = moment(date);
          if (momentDate.isValid) {
            format = format || "DD/MM/YYYY HH:mm:ss";
            return momentDate
              .format(format)
              .replace(" 00:00:00", "")
              .replace("00:00:00", "");
          } else {
            return "";
          }
        }
      },
      
      toBinary: (string) => {
        const codeUnits = new Uint16Array(string.length);
        for (let i = 0; i < codeUnits.length; i++) {
          codeUnits[i] = string.charCodeAt(i);
        }
        return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
      },
      fromBinary: (encoded) => {
        const binary = atob(encoded);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < bytes.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        return String.fromCharCode(...new Uint16Array(bytes.buffer));
      },

      parseFileAndUpload: _beforeUpload,
      parseFileAndUpload: _parseFileAndUpload,
      readAndUploadContinue: _readAndUploadContinue,
    },
  };
});
