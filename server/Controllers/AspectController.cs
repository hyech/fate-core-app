using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models.Entities;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AspectController : ControllerBase
{
    private readonly AspectDBContext _dbContext;
    public AspectController(AspectDBContext dbContext) =>
        _dbContext = dbContext;

    [HttpGet]
    public async Task<List<Aspect>> Get()
    {
        return await _dbContext.Aspects.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<Aspect> GetById(float id)
    {
        return await _dbContext.Aspects.FirstOrDefaultAsync(x => x.Id == id);
    }

    [HttpPost]
    public async Task<ActionResult> Create([FromBody] Aspect asp)
    {
        await _dbContext.Aspects.AddAsync(asp);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = asp.Id }, asp);
    }

    [HttpPut]
    public async Task<ActionResult> Update([FromBody] Aspect asp)
    {
        _dbContext.Aspects.Update(asp);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(float id)
    {
        var asp = await GetById(id);
        if (asp is null)
        {
            return NotFound();
        }

        _dbContext.Aspects.Remove(asp);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

}