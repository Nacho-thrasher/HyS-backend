const { response } = require("express");
const Empresa = require("../models/empresa");
const Extintor = require("../models/extintor");

const getVistaEmpresas = async (req, res = response) => {
  const empresas = await Empresa.find().populate("usuario", "nombre");
  res.json({
    ok: true,
    empresas,
  });
};

const getExtintoresByEmpresa = async (req, res = response) => {
  const empresa = req.params.id;
  const empresaNoSpace = empresa.replace(/_/g, " ");
  const regexp = new RegExp(empresaNoSpace, "i");

  try {
    const empresaName = await Empresa.find({ nombre: empresaNoSpace });

    const empresaId = empresaName[0]._id;

    const extintores = await Extintor.find({ empresa: empresaId }).populate(
      "empresa usuario",
      "nombre"
    );

    res.json({
      ok: true,
      nom: empresaNoSpace,
      extintores,
    });
  } catch (error) {
    console.error(error);
    res.json({
      ok: true,
      msg: "no existe empresa",
    });
  }
};

module.exports = {
  getVistaEmpresas,
  getExtintoresByEmpresa,
};
