---
layout: home
title: Akreditasi Klinik
hero:
  name: "Akreditasi Klinik"
  text: "Dokumen referensi "
  actions:
    # - theme: brand
    #   text: Markdown Examples
    #   link: /markdown-examples
    # - theme: alt
    #   text: API Examples
    #   link: /api-examples
    - theme: brand
      text: Mulai
      link: /pendahuluan/
    - theme: alt
      text: Referensi
      link: /pendahuluan/referensi

features:
  - title: Tata Kelola 
    details: Tata kelola klinik yang baik akan menghasilkan pelayanan yang baik terutama dalam upaya meningkatkan mutu dan keselamatan pasien. 
  - title: Mutu dan Keselamatan Pasien
    details: Dalam memberikan pelayanan dan asuhan pada pasien, klinik melaksanakan program Peningkatan Mutu dan Keselamatan Pasien.
  - title: Penyelenggaraan Kesehatan Perseorangan
    details: Pelayanan yang dilakukan di klinik meliputi pelayanan preventif, promotif, kuratif dan rehabilitatif.
---

```mermaid
---
  config:
    class:
      hideEmptyMembersBox: true
---
classDiagram
    `Kepala Puskesmas` -- `Klaster 1`
    `Kepala Puskesmas` -- `Klaster 2`
    `Kepala Puskesmas` -- `Klaster 3`
    `Kepala Puskesmas` -- `Klaster 4`
    `Kepala Puskesmas` -- `Lintas Klaster`
    class `Kepala Puskesmas`
    class `Klaster 1` {
        Ketatausahaan
        Manajemen Sumber Daya
        Manajemen Puskesmas
        Manajemen Mutu dan Keselamatan
        Manajemen Jejaring dan Jaringan Puskesmas
        Manajemen Informasi Puskesmas dan Dashboard PWS
    }
    class `Klaster 2` {
        Ibu Hamil, Bersalin, Nifas
    }
    class `Klaster 3`
    class `Klaster 4`
    class `Lintas Klaster`
```
